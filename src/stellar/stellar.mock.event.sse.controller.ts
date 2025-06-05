import { Controller, Logger, MessageEvent, Param, Sse } from "@nestjs/common";
import { interval, map, Observable } from 'rxjs';
import { StellarMockEventService } from './stellar.mock.event.service';

@Controller('api/stellar/mock/event')
export class StellarMockEventSseController {
  private readonly logger = new Logger(StellarMockEventService.name);
  constructor(
    private readonly stellarMockEventService: StellarMockEventService,
  ) {
    this.logger.log(`Stellar Mock Event Controller Initialized`);
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(this.stellarMockEventService.transformMessageEvent()),
    );
  }

  @Sse('sse/:contractId')
  sse_by_contract_id(
    @Param('contractId') contractId: string,
  ): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(
        this.stellarMockEventService.transformMessageEventWithContract(
          contractId,
        ),
      ),
    );
  }
}
