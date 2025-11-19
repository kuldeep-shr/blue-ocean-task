import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { SubCategoryService } from '../subCategory/subcategory.service';

import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './schemas/category.schema';
import {
  SubCategory,
  SubCategorySchema,
} from '../subCategory/schemas/subcategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, SubCategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
