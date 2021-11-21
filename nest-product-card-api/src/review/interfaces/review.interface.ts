import { Document, Types } from 'mongoose';

export interface IReview extends Document {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly rating: number;
  readonly productId: Types.ObjectId;
}
