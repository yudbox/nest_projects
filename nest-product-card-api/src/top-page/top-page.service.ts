import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopLevelCategory } from './enums/topLevelCategory.enum';
import { ITopPage } from './interfaces/top-page.interface';

@Injectable()
export class TopPageService {
  constructor(@InjectModel('TopPage') private topPageModel: Model<ITopPage>) {}

  async createTPInstance(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async findTPById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async findTPByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async findTPByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel
      .find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
      .exec();
  }

  async deleteTPById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updateTPById(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByText(text: string) {
    return await this.topPageModel
      .find({
        $text: {
          $search: text,
          $caseSensitive: false,
        },
      })
      .exec();
  }
}
