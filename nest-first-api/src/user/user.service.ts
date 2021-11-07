import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as lodash from 'lodash';

import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
    console.log('11111111 userModel', this.userModel);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto, roles: string[]): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const createdUser = new this.userModel(
      lodash.assignIn(createUserDto, { password: hash, roles }),
    );
    return await createdUser.save();
  }

  async find(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(id: string, payload: Partial<IUser>) {
    return this.userModel.updateOne({ _id: id }, payload);
  }
}
