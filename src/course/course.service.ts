import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, Types } from 'mongoose';

import { Course, CourseDocument } from './schemas/course.schema';
import { Category } from '../category/schemas/category.schema';
import { SubCategory } from '../subCategory/schemas/subcategory.schema';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ListQueryDto } from '../common/dto/list-query.dto';

import { runTransaction } from '../common/utils/transaction.util';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,

    @InjectModel(Category.name)
    private readonly categoryModel: Model<any>,

    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<any>,

    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(dto: CreateCourseDto) {
    return runTransaction(this.connection, async (session) => {
      const categoryIds = dto.categoryIds.map((id) => new Types.ObjectId(id));
      const subCategoryIds = dto.subCategoryIds.map(
        (id) => new Types.ObjectId(id),
      );

      // VALIDATE CATEGORIES
      const categories = await this.categoryModel.find(
        {
          _id: { $in: categoryIds },
          isDeleted: false,
        },
        null,
        { session },
      );

      if (categories.length !== categoryIds.length) {
        throw new BadRequestException('Invalid categoryIds provided.');
      }

      const subCategories = await this.subCategoryModel.find(
        {
          _id: { $in: subCategoryIds },
          isDeleted: false,
        },
        null,
        { session },
      );

      if (subCategories.length !== subCategoryIds.length) {
        throw new BadRequestException('Invalid subCategoryIds provided.');
      }

      const invalidSubs = subCategories.filter(
        (sub) => !categoryIds.some((catId) => catId.equals(sub.categoryId)),
      );

      if (invalidSubs.length > 0) {
        throw new BadRequestException(
          'Some subcategories do not belong to the selected categories.',
        );
      }

      // CREATE COURSE
      const created = await this.courseModel.create(
        [
          {
            title: dto.title,
            description: dto.description,
            categoryIds,
            subCategoryIds,
          },
        ],
        { session },
      );

      return created[0];
    });
  }

  // LIST
  async findAll(query: ListQueryDto) {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const filter: any = { isDeleted: false };

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const data = await this.courseModel
      .find(filter)
      .populate('categoryIds')
      .populate('subCategoryIds')
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    const total = await this.courseModel.countDocuments(filter);

    return { total, page, limit, data };
  }

  // SINGLE
  async findOne(id: string) {
    const course = await this.courseModel
      .findOne({ _id: id, isDeleted: false })
      .populate('categoryIds')
      .populate('subCategoryIds');

    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  // UPDATE
  async update(id: string, dto: UpdateCourseDto) {
    const course = await this.courseModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      dto,
      { new: true },
    );

    if (!course) throw new NotFoundException('Course not found');

    return course;
  }

  // DELETE
  async remove(id: string) {
    const course = await this.courseModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );

    if (!course) throw new NotFoundException('Course not found');

    return { message: 'Course deleted successfully' };
  }
}
