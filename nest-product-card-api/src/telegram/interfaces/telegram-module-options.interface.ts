import { ModuleMetadata } from '@nestjs/common';
import { ITelegramOptions } from './telegram-options.interface';

export interface ITelegramModuleOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions;
  inject: any[];
}
