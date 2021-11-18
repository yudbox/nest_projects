import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
// import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
  // роут который будет создавать продукты
  // Omit это функция TS которая позволяет возвращаемые из базы ключи не выводить
  // Pick обратная Omit функция которая позволяет выбирать какие ключи выводить

  // @Post('create')
  // async createProduct(@Body() dto: Omit<ProductModel, '_id'>) {}

  // @Get(':id')
  // async getProduct(@Param('id') id: string) {}

  // @Delete(':id')
  // async deleteProduct(@Param('id') id: string) {}

  // @Patch(':id')
  // async udateProduct(@Param('id') id: string, @Body() dto: ProductModel) {}

  // @HttpCode(200)
  // @Post()
  // async findProduct(@Body() dto: FindProductDto) {}
}
