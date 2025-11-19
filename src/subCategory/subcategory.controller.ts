import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { SubCategoryService } from './subcategory.service';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';
import { ListQueryDto } from '../common/dto/list-query.dto';
import { handleController } from '../common/utils/response.util';

@Controller('subcategory')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post('create')
  create(@Body() dto: CreateSubCategoryDto) {
    return handleController(
      () => this.subCategoryService.create(dto),
      'SubCategory created successfully',
      201,
    );
  }

  @Get()
  findAll(@Query() query: ListQueryDto) {
    return handleController(
      () => this.subCategoryService.findAll(query),
      'SubCategories fetched successfully',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return handleController(
      () => this.subCategoryService.findOne(id),
      'SubCategory fetched successfully',
    );
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateSubCategoryDto) {
    return handleController(
      () => this.subCategoryService.update(id, dto),
      'SubCategory updated successfully',
    );
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return handleController(
      () => this.subCategoryService.remove(id),
      'SubCategory deleted successfully',
    );
  }
}
