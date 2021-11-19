import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { AuthDto } from './dto/auth.dto';
import { IAuth } from './interfaces/auth.interfase';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly authUserModel: Model<IAuth>,
    private readonly jwtServise: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    //создаем соль через bcrypt, в ДТО получаем объект логинизации с фронта, т.к. мы не хотим
    //хранить в БД открытый пароль - создаем новый объект newAuthUser и kjложим в него
    // закодированный passwordHash и теперь в БД будет хранится захешированный пароль функцией hash
    const salt = await genSalt(10);

    const newAuthUser = new this.authUserModel({
      email: dto.login,
      passwordHash: await hash(dto.password, salt),
      createdAt: new Date().toISOString(),
    });

    return newAuthUser.save();
  }

  async findUser(email: string) {
    return this.authUserModel.findOne({ email }).exec();
  }

  // валидация и jwt token
  // сначала мы ищем пользователя по email, если пользователь с таким email есть
  // тогда с помощью функ-ии compare сравниваем пришедший и зашифрованый в БД пароль
  // если функция вернула true тогда возвращаем email

  // следующая функция login получает этот email и с помощью jwtServise генерирует токен
  // для того чтоб jwtServise работал нужно подключить jwtModule в нашем модуле

  async validateUser(email: string, password: string) {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtServise.signAsync(payload),
    };
  }
}
