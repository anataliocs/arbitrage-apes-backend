import { StellarSdkService } from './stellar.sdk.service';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class StellarSdkModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: StellarSdkModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        StellarSdkService,
      ],
      exports: [StellarSdkService],
    };
  }
}
