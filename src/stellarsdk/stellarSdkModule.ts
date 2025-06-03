import { StellarSdkService } from './stellar.sdk.service';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({ imports: [ConfigModule] })
export class StellarSdkModule {
  static register(options: Record<string, string>): DynamicModule {
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
