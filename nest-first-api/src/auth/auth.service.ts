import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {
    const mongoConnectionStr = this.configService.get<string>(
      'MONGODB_WRITE_CONNECTION_STRING',
    );

    console.log('111 mongoConnectionStr', mongoConnectionStr);
  }
}
