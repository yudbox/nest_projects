import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HhController } from './hh.controller';
import { HhService } from './hh.service';

@Module({
  controllers: [HhController],
  imports: [ConfigModule, HttpModule],
  providers: [HhService],
  exports: [HhService],
})
export class HhModule {}
