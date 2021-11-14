import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { IReview } from './schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(@InjectModel('Review') private reviewModel: Model<IReview>) {}

  async createReviewInstance(dto: CreateReviewDto): Promise<IReview> {
    return this.reviewModel.create(dto);
  }

  async deleteReviewInstance(id: string): Promise<IReview | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<IReview[]> {
    const id = new Types.ObjectId(productId);
    return this.reviewModel.find({ productId: id }).exec();
  }

  async deleteByProductId(productId: string) {
    const id = new Types.ObjectId(productId);
    return this.reviewModel.deleteMany({ productId: id }).exec();
  }
}
