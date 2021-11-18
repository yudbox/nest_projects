import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { IAuth } from './interfaces/auth.interfase';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly authUserModel: Model<IAuth>,
  ) {}

  async createUser(dto: AuthDto) {
    //создаем соль через bcrypt, в ДТО получаем объект логинизации с фронта, т.к. мы не хотим
    //хранить в БД открытый пароль - создаем новый объект newAuthUser и kjложим в него
    // закодированный passwordHash и теперь в БД будет хранится захешированный пароль функцией hashSync
    const salt = genSaltSync(10);

    const newAuthUser = new this.authUserModel({
      email: dto.login,
      passwordHash: hashSync(dto.password, salt),
      createdAt: new Date().toISOString(),
    });

    return newAuthUser.save();
  }

  async findUser(email: string) {
    return this.authUserModel.findOne({ email }).exec();
  }
}
