import { Injectable, Logger } from '@nestjs/common';
import { StellarSdkService } from '../../stellarsdk/stellar.sdk.service';

@Injectable()
export class StellarTestnetEventService {
  private readonly logger = new Logger(StellarTestnetEventService.name);

  constructor(private readonly stellarSdkService: StellarSdkService) {
    this.logger.log(
      `Stellar Testnet Server Sent Event Service Initialized: ${stellarSdkService.rpcServer.serverURL}`,
    );
  }
  
  
}
