import { Module } from '@nestjs/common';
import { StellarWebsocketGateway } from './stellar.websocket.gateway';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { StellarMockEventSseController } from './sse/mock/stellar.mock.event.sse.controller';
import { StellarSdkModule } from '../stellarsdk/stellarSdkModule';
import { StellarSdkService } from '../stellarsdk/stellar.sdk.service';
import { StellarMockEventService } from './sse/mock/stellar.mock.event.service';
import { StellarTestnetEventService } from './sse/stellar.testnet.event.service';
import { StellarTestnetEventController } from './sse/stellar.testnet.event.controller';

@Module({
  imports: [HttpModule, ConfigModule, StellarSdkModule],
  providers: [
    StellarWebsocketGateway,
    StellarSdkService,
    StellarMockEventService,
    StellarTestnetEventService,
  ],
  controllers: [StellarMockEventSseController, StellarTestnetEventController],
})
export class StellarModule {}
