// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryModule } from './category/category.module';
// import { SubCategoryModule } from './subcategory/subcategory.module';
// import { CourseModule } from './course/course.module';

import { mongooseConfig } from './config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongooseConfig,
    }),
    CategoryModule,
  ],
})
export class AppModule {}
