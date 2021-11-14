import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageSchema } from './schemas/top-page.schema';
import { TopPageController } from './top-page.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'TopPage', schema: TopPageSchema}])],
  controllers: [TopPageController]
})
export class TopPageModule {}
