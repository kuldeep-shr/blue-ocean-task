import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ListQueryDto } from '../common/dto/list-query.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // CREATE
  @Post('create')
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  // LIST WITH PAGINATION, SEARCH, SORT
  @Get()
  findAll(@Query() query: ListQueryDto) {
    return this.categoryService.findAll(query);
  }

  // SINGLE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  // UPDATE (POST)
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  // SOFT DELETE (POST)
  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  // CATEGORY + SUBCATEGORY COUNT AGGREGATION
  @Get('analytics/with-count')
  getCategorySubCategoryCount() {
    return this.categoryService.getCategoryWithSubCategoryCount();
  }
}
