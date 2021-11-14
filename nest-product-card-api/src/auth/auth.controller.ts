import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  // Post, Body, HttpCode это дикоратор которыми мы обвешивает роут
  // Post возвращает 201 код по умолчанию, а успешный код равен 200 по значению кодов
  // Dto Data Transfer Object это классы которые описывают body данных которые будут прокидываться в наши методы

  @Post('register')
  async register(@Body() dto: AuthDto) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {}
}
