import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { SubCategory, SubCategoryDocument } from './schemas/subcategory.schema';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';
import { ListQueryDto } from '../common/dto/list-query.dto';
import {
  Category,
  CategoryDocument,
} from '../category/schemas/category.schema';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategoryDocument>,

    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  // CREATE
  async create(dto: CreateSubCategoryDto) {
    const categoryExists = await this.categoryModel.findOne({
      _id: dto.categoryId,
      isDeleted: false,
    });

    if (!categoryExists) throw new NotFoundException('Category does not exist');

    const exists = await this.subCategoryModel.findOne({
      name: dto.name,
      categoryId: dto.categoryId,
      isDeleted: false,
    });

    if (exists) throw new ConflictException('SubCategory already exists');

    return this.subCategoryModel.create(dto);
  }

  // LIST WITH SEARCH + PAGINATION + SORT
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
      filter.name = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const data = await this.subCategoryModel
      .find(filter)
      .populate('categoryId')
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    const total = await this.subCategoryModel.countDocuments(filter);

    return { total, page, limit, data };
  }

  // SINGLE
  async findOne(id: string) {
    const sub = await this.subCategoryModel
      .findOne({ _id: id, isDeleted: false })
      .populate('categoryId');

    if (!sub) throw new NotFoundException('SubCategory not found');

    return sub;
  }

  // UPDATE
  async update(id: string, dto: UpdateSubCategoryDto) {
    if (dto.categoryId) {
      const categoryExists = await this.categoryModel.findOne({
        _id: dto.categoryId,
        isDeleted: false,
      });
      if (!categoryExists)
        throw new NotFoundException('New category not found');
    }

    const sub = await this.subCategoryModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      dto,
      { new: true },
    );

    if (!sub) throw new NotFoundException('SubCategory not found');

    return sub;
  }

  // SOFT DELETE
  async remove(id: string) {
    const sub = await this.subCategoryModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );

    if (!sub) throw new NotFoundException('SubCategory not found');

    return { message: 'SubCategory deleted successfully' };
  }
}
