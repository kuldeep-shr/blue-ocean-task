import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsMongoId } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsOptional()
  description?: string;
}
