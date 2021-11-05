import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as lodash from 'lodash';

import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
    console.log('11111111 userModel', this.userModel);
  }

  async create(
    createUserDto: CreateUserDto,
    roles: Array<string>,
  ): Promise<IUser> {
    // соль или salt это все гененрация шифра для пароля читать библиотеку bcrypt
    const soaltRound = 10;
    const salt = await bcrypt.genSalt(soaltRound);
    const hash = await bcrypt.hash(createUserDto.password, salt);
    // создаем объект для сохранения где пароль и роли будут подменены в объекте createUserDto на {password: hash, roles}
    const createUser = new this.userModel(
      lodash.assignIn(createUserDto, { password: hash, roles }),
    );

    // сохраняем объект созданный на основе модели  userModel в базу
    return await createUser.save();
  }

  async find(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }
}
