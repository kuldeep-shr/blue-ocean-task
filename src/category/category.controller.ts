import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  HttpStatus,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ListQueryDto } from '../common/dto/list-query.dto';
import { handleController } from '../common/utils/response.util';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  create(@Body() dto: CreateCategoryDto) {
    return handleController(
      () => this.categoryService.create(dto),
      'Category created successfully',
      201,
    );
  }

  @Get()
  findAll(@Query() query: ListQueryDto) {
    return handleController(
      () => this.categoryService.findAll(query),
      'Categories fetched successfully',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return handleController(
      () => this.categoryService.findOne(id),
      'Category fetched successfully',
    );
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return handleController(
      () => this.categoryService.update(id, dto),
      'Category updated successfully',
    );
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return handleController(
      () => this.categoryService.remove(id),
      'Category deleted successfully',
    );
  }

  @Get('analytics/with-count')
  getCategorySubCategoryCount() {
    return handleController(
      () => this.categoryService.getCategoryWithSubCategoryCount(),
      'Category analytics fetched successfully',
    );
  }
}
