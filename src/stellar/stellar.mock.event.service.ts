import { Injectable, Logger, MessageEvent } from '@nestjs/common';
import { StellarSdkService } from '../stellarsdk/stellar.sdk.service';
import { Api } from '@stellar/stellar-sdk/lib/rpc/api';

interface MockContractEvent {
  type: string;
  ledger: number;
  ledgerClosedAt: string;
  id: string;
  pagingToken: string;
  contractId: string;
  topic: string[];
  value: string;
}

@Injectable()
export class StellarMockEventService {
  private readonly logger = new Logger(StellarMockEventService.name);
  private readonly _ledger = 1206844;

  private currentLedger = 0;

  private readonly _type = `contract`;

  private readonly _topics = [
    'AAAADwAAAARtaW50',
    'AAAAEgAAAAAAAAAAvBH8ODS0wMgqud9X6VGlvEVG9iQy4qjdlhXAHlneCtw=',
  ];

  private readonly _value = 'AAAAAwAAAIQ=';

  private defaultContractId: string =
    'CC6GBNMVYR4SVUDWTIP7KTMGBQF22OJQFTBXHGZKE3LLJPBGIYXIIOL4';
  private defaultStartLedger: number = 1206844;

  constructor(private readonly stellarSdkService: StellarSdkService) {
    this.logger.log(
      `Stellar Mock Event Service Initialized: ${stellarSdkService.rpcServer.serverURL}`,
    );
  }

  transformMessageEvent(): (n: number) => MessageEvent {
    return (n: number): MessageEvent => this.mapNtoMockContractEvent(n);
  }
  transformMessageEventWithContract(
    contractId: string,
  ): (n: number) => MessageEvent {
    return (n: number): MessageEvent =>
      this.mapMockContractEvent(n, contractId);
  }

  mapMockContractEvent(n: number, contractId: string): MessageEvent {
    try {
      const mockEvent: MockContractEvent = this.getMockEvent(
        contractId,
        this.defaultStartLedger,
        n,
      );
      return this.buildMessageEvent(mockEvent, n);
    } catch (error) {
      throw new Error(`Error loading account: ${error.message}`);
    }
  }

  mapNtoMockContractEvent(n: number): MessageEvent {
    try {
      const mockEvent: MockContractEvent = this.getMockEvent(
        this.defaultContractId,
        this.defaultStartLedger,
        n,
      );
      return this.buildMessageEvent(mockEvent, n);
    } catch (error) {
      throw new Error(`Error loading account: ${error.message}`);
    }
  }

  private buildMessageEvent(
    mockEvent: MockContractEvent,
    n: number,
  ): MessageEvent {
    return {
      type: 'message',
      id: n + '',
      data: mockEvent,
      retry: 0,
    } as MessageEvent;
  }

  getMockEvent(
    contractId: string,
    startLedger: number,
    n: number,
  ): MockContractEvent {
    return this.transformEventResponseToMockEvent(
      this.stellarSdkService.getMockContractEvent(contractId, startLedger),
      n,
    );
  }

  transformEventResponseToMockEvent(
    event: Api.EventResponse,
    n: number,
  ): MockContractEvent {
    try {
      this.logger.log(
        `Transforming RPC Event Response for Ledger #: ${event.ledger} Ledger Close: ${event.ledgerClosedAt}`,
      );
      return {
        type: event.type,
        ledger: event.ledger + n,
        ledgerClosedAt: event.ledgerClosedAt,
        id: event.id,
        pagingToken: event.pagingToken,
        contractId: event.contractId.contractId(),
        topic: this._topics,
        value: this._value,
      } as MockContractEvent;
    } catch (error) {
      throw new Error(`Error loading account: ${error.message}`);
    }
  }
}
