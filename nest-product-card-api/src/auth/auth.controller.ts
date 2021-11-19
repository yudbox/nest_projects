import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ALREADY_REGISTERED_USER_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // Post, Body, HttpCode это дикоратор которыми мы обвешивает роут
  // Post возвращает 201 код по умолчанию, а успешный код равен 200 по значению кодов
  // Dto Data Transfer Object это классы которые описывают body данных которые будут прокидываться в наши методы
  @UsePipes(new ValidationPipe())
  @Post('/register')
  async register(@Body() dto: AuthDto) {
    const checkExistingUser = await this.authService.findUser(dto.login);
    if (checkExistingUser) {
      throw new BadRequestException(ALREADY_REGISTERED_USER_ERROR);
    }
    return this.authService.createUser(dto);
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() dto: AuthDto) {
    const { email } = await this.authService.validateUser(
      dto.login,
      dto.password,
    );
    return this.authService.login(email);
  }
}
