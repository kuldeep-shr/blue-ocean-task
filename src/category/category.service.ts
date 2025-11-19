import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ListQueryDto } from '../common/dto/list-query.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  // CREATE -------------------------------------------------
  async create(dto: CreateCategoryDto) {
    const exists = await this.categoryModel.findOne({
      name: dto.name,
      isDeleted: false,
    });

    if (exists) throw new ConflictException('Category name already exists');

    return this.categoryModel.create(dto);
  }

  // FIND ALL WITH PAGINATION, FILTER, SEARCH ----------------
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

    const data = await this.categoryModel
      .find(filter)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    const total = await this.categoryModel.countDocuments(filter);

    return { total, page, limit, data };
  }

  // FIND ONE ------------------------------------------------
  async findOne(id: string) {
    const category = await this.categoryModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  // UPDATE
  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.categoryModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      dto,
      { new: true },
    );

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async remove(id: string) {
    const category = await this.categoryModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );

    if (!category) throw new NotFoundException('Category not found');

    return { message: 'Category deleted successfully' };
  }
}
