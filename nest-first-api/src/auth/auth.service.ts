import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignOptions } from 'jsonwebtoken';
import { CreateUserTokenDto } from '../token/dto/create-user-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
    const mongoConnectionStr = this.configService.get<string>(
      'MONGODB_WRITE_CONNECTION_STRING',
    );

    console.log('111 mongoConnectionStr', mongoConnectionStr);
  }

  signUp(createUserDto: CreateUserDto) {}

  signIn(email, password) {}

  private async generateToken(data, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  private async verifyToken(token): Promise<any> {
    try {
      const data = this.jwtService.verify(token);
      const tokenExists = await this.tokenService.exists(data._id, token);

      if (tokenExists) {
        return data;
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async saveToken(createUserTokenDto: CreateUserTokenDto) {
    const userToken = await this.tokenService.create(createUserTokenDto);

    return userToken;
  }
}
