import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';
import { IReview } from './schemas/review.schema';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async createReview(@Body() dto: CreateReviewDto): Promise<IReview> {
    return this.reviewService.createReviewInstance(dto);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    const deleteResult = await this.reviewService.deleteReviewInstance(id);

    if (!deleteResult) {
      return new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return deleteResult;
  }

  @Get('byProduct/:productId')
  async getReviewByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}
