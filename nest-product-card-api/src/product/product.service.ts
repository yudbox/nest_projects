import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<IProduct>) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  // метод findByIdAndUpdate возвращает старый объект обновления, если нужно получить
  // обновленные объект - необходимо передать значение { new: true }
  async updateById(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto) {
    return this.productModel
      .aggregate([
        {
          $match: {
            // ищем в массиве catigories нужную category
            catigories: dto.category,
          },
        },
        {
          //затем сортируем по _id, это нужно делать всегда перед функциями limit or skip для корректного отображения
          $sort: {
            _id: 1,
          },
        },
        {
          // ограничиваем вывод поиска до limit
          $limit: dto.limit,
        },
        {
          $lookup: {
            //подтягтвает данные из другой таблицы, тоже что JOIN
            from: 'Review', // имя Коллекции из которой будем получать данные, записано в модуле Review
            localField: '_id', // колонка в коллекции Product по которой будем искать совпадения
            foreignField: 'productId', // колонка в коллекции Review по которой будем искать совпадения
            as: 'reviews', // имя поля в котором будет выводится полученные данные
          },
        },
        {
          $addFields: {
            // данный пайп добавляет дополнительные поля в ответ
            reviewsCount: { $size: '$reviews' }, // добовляем поле reviewsCount которое объект reviews из прошлой операции   посчитает количество елементов в eviews
            reviewsAvg: { $avg: '$reviews.rating' }, // добавит поле reviewsAvg которое посчитаеи среднее арифметическое (avg) из reviews.raiting
            sortedReviews: {
              $function: {
                body: `function(reviews) {
                        reviews.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
                        return reviews
                    }`,
                args: ['$reviews'],
                lang: 'js',
              },
            },
          },
        },
      ])
      .exec();
  }
}
