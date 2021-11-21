import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';
import { IReview } from './interfaces/review.interface';
import { IdValidationPipe } from 'src/pipes/id-validation.pipes';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async createReview(@Body() dto: CreateReviewDto): Promise<IReview> {
    return this.reviewService.createReviewInstance(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteReview(@Param('id', IdValidationPipe) id: string) {
    const deleteResult = await this.reviewService.deleteReviewInstance(id);

    if (!deleteResult) {
      return new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return deleteResult;
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getReviewByProduct(
    @Param('productId') productId: string,
    @UserEmail() email: string,
  ) {
    return this.reviewService.findByProductId(productId);
  }
}
