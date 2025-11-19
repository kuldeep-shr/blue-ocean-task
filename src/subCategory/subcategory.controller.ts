import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { SubCategoryService } from './subcategory.service';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subcategory.dto';
import { ListQueryDto } from '../common/dto/list-query.dto';

@Controller('subcategory')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post('create')
  create(@Body() dto: CreateSubCategoryDto) {
    return this.subCategoryService.create(dto);
  }

  @Get()
  findAll(@Query() query: ListQueryDto) {
    return this.subCategoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateSubCategoryDto) {
    return this.subCategoryService.update(id, dto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.subCategoryService.remove(id);
  }
}
