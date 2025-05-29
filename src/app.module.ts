import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { StellarModule } from './stellar/stellar.module';
import { StellarMockEventController } from './stellar/stellar.mock.event.controller';
import { StellarSdkModule } from './stellarsdk/stellarSdkModule';
import { StellarMockEventService } from "./stellar/stellar.mock.event.service";

@Module({
  imports: [
    StellarSdkModule.register({
      rpcServerUrl: 'https://soroban-testnet.stellar.org',
    }),
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.dev', '.env.ci'],
      isGlobal: true,
    }),
    HttpModule,
  ],
  providers: [StellarMockEventService],
  controllers: [StellarMockEventController],
  exports: [StellarSdkModule],
})
export class AppModule {}
