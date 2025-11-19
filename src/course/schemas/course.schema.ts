import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], required: true })
  categoryIds: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'SubCategory' }],
    required: true,
  })
  subCategoryIds: Types.ObjectId[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
