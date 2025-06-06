import { Controller, Logger, Sse } from '@nestjs/common';
import { interval, Observable } from 'rxjs';
import { StellarTestnetEventService } from './stellar.testnet.event.service';

@Controller('api/stellar/event')
export class StellarTestnetEventController {
  private readonly logger = new Logger(StellarTestnetEventController.name);

  constructor(
    private readonly stellarMockEventService: StellarTestnetEventService,
  ) {
    this.logger.log(`Stellar Mock Event Controller Initialized`);
  }

  @Sse('sse')
  sse(): Observable<number> {
    return interval(1000).pipe();
  }
}
