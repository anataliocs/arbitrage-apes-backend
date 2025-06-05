import { Module } from '@nestjs/common';
import { StellarGateway } from './stellar.gateway';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { StellarMockEventSseController } from './stellar.mock.event.sse.controller';
import { StellarSdkModule } from '../stellarsdk/stellarSdkModule';
import { StellarSdkService } from '../stellarsdk/stellar.sdk.service';
import { StellarMockEventService } from './stellar.mock.event.service';

@Module({
  imports: [HttpModule, ConfigModule, StellarSdkModule],
  providers: [StellarGateway, StellarSdkService, StellarMockEventService],
  controllers: [StellarMockEventSseController],
})
export class StellarModule {}
