import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HhModule } from 'src/hh/hh.module';
import { TopPageSchema } from './schemas/top-page.schema';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TopPage', schema: TopPageSchema }]),
    HhModule,
  ],
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule {}
