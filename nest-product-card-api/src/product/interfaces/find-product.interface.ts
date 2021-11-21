import { IReview } from 'src/review/interfaces/review.interface';
import { IProduct } from './product.interface';

export interface IFindProduct extends IProduct {
  reviews: IReview[];
  reviewsCount: number;
  reviewsAvg: number;
}
