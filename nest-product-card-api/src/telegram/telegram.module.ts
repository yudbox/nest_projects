import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ITelegramModuleOptions } from './interfaces/telegram-module-options.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { TelegramService } from './telegram.service';

@Global()
@Module({})
export class TelegramModule {
  static forRootAsync(options: ITelegramModuleOptions): DynamicModule {
    const asyncOptions = this.createOptionsProvider(options);
    return {
      module: TelegramModule,
      imports: options.imports,
      providers: [TelegramService, asyncOptions],
      exports: [TelegramService],
    };
  }

  private static createOptionsProvider(
    options: ITelegramModuleOptions,
  ): Provider {
    return {
      provide: TELEGRAM_MODULE_OPTIONS,
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args);
        return config;
      },
      inject: options.inject || [],
    };
  }
}
