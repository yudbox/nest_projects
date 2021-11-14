import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthSchema } from './schemas/auth.shema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Auth', schema: AuthSchema}])],
  controllers: [AuthController]
})
export class AuthModule {}
