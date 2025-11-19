import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsMongoId({ each: true })
  categoryIds: string[];

  @IsArray()
  @IsMongoId({ each: true })
  subCategoryIds: string[];
}
