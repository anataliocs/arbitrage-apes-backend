import { Controller, Logger, MessageEvent, Sse } from "@nestjs/common";
import { interval, map, Observable } from 'rxjs';
import { StellarMockEventService } from './stellar.mock.event.service';

@Controller('api/stellar/mock/event')
export class StellarMockEventController {
  private readonly logger = new Logger(StellarMockEventService.name);
  constructor(
    private readonly stellarMockEventService: StellarMockEventService,
  ) {
    this.logger.log(
      `Stellar Mock Event Controller Initialized with ${stellarMockEventService}`,
    );
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(this.stellarMockEventService.transformMessageEvent()),
    );
  }

  private transformMessageEvent(): (n: number) => MessageEvent {
    return (n: number): MessageEvent => ({ data: { hello: n } }) as MessageEvent;
  }
}
