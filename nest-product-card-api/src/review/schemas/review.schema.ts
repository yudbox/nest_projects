import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Review {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  // @Prop({ type: Date, required: true })
  // createdAt: Date;

  @Prop()
  productId: Types.ObjectId;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
