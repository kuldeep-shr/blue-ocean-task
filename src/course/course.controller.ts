import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ListQueryDto } from '../common/dto/list-query.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get()
  findAll(@Query() query: ListQueryDto) {
    return this.courseService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.update(id, dto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
