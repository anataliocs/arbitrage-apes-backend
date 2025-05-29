import { Module } from '@nestjs/common';
import { StellarGateway } from './stellar.gateway';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { StellarMockEventController } from './stellar.mock.event.controller';
import { StellarSdkModule } from '../stellarsdk/stellarSdkModule';
import { StellarSdkService } from '../stellarsdk/stellar.sdk.service';
import { StellarMockEventService } from './stellar.mock.event.service';

@Module({
  imports: [HttpModule, ConfigModule, StellarSdkModule],
  providers: [StellarGateway, StellarSdkService, StellarMockEventService],
  controllers: [StellarMockEventController],
})
export class StellarModule {}
