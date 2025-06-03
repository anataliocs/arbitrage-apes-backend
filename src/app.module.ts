import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { StellarMockEventController } from './stellar/stellar.mock.event.controller';
import { StellarSdkModule } from './stellarsdk/stellarSdkModule';
import { StellarMockEventService } from './stellar/stellar.mock.event.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.dev', '.env.ci'],
      isGlobal: true,
    }),
    HttpModule,
    StellarSdkModule.register({
      rpcServerUrl: 'https://soroban-testnet.stellar.org',
    }),
  ],
  providers: [StellarMockEventService],
  controllers: [StellarMockEventController],
  exports: [StellarSdkModule],
})
export class AppModule {}
