import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ListQueryDto } from '../common/dto/list-query.dto';
import { handleController } from '../common/utils/response.util';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  create(@Body() dto: CreateCourseDto) {
    return handleController(
      () => this.courseService.create(dto),
      'Course created successfully',
      201,
    );
  }

  @Get()
  findAll(@Query() query: ListQueryDto) {
    return handleController(
      () => this.courseService.findAll(query),
      'Courses fetched successfully',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return handleController(
      () => this.courseService.findOne(id),
      'Course fetched successfully',
    );
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return handleController(
      () => this.courseService.update(id, dto),
      'Course updated successfully',
    );
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return handleController(
      () => this.courseService.remove(id),
      'Course deleted successfully',
    );
  }
}
