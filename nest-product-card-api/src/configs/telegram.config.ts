import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/interfaces/telegram-options.interface';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get('TELEGRAM_TOKEN');
  if (!token) {
    throw new Error('TELEGRAM_TOKEN not found');
  }
  return {
    chatId: configService.get('CHAT_ID') ?? '',
    token,
  };
};
