import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import * as StellarSdk from '@stellar/stellar-sdk';
import { Contract, xdr, rpc } from '@stellar/stellar-sdk';
import { Api } from '@stellar/stellar-sdk/lib/rpc/api';
import EventResponse = Api.EventResponse;

@Injectable()
export class StellarSdkService implements OnApplicationShutdown, OnModuleInit {
  private readonly logger = new Logger(StellarSdkService.name);

  get rpcServer(): StellarSdk.rpc.Server {
    return this._rpcServer;
  }

  set rpcServer(value: StellarSdk.rpc.Server) {
    this._rpcServer = value;
  }
  private _rpcServer: StellarSdk.rpc.Server;

  constructor(@Inject('CONFIG_OPTIONS') private options: Record<string, any>) {
    this._rpcServer = new StellarSdk.rpc.Server(options.rpcServerUrl);
  }

  onModuleInit() {
    this._rpcServer
      .getHealth()
      .then((value) =>
        this.logger.log(
          value,
          `Stellar SDK Rpc Server Status: ${value.status} - Rpc Server URL: ${this._rpcServer.serverURL}`,
        ),
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onApplicationShutdown(_signal?: string) {
    this.logger.log(`Closing Stellar SDK Rpc Server Connection`);
  }

  /**
   * Returns sequence number representing the last 24 hours of ledgers and events.
   *
   * @returns Promise resolving to sequence number
   * @throws Error if the RPC request fails or returns invalid data
   */
  async getLast24HourSequence(): Promise<number> {
    const latestLedger: Api.GetLatestLedgerResponse =
      await this._rpcServer.getLatestLedger();

    return latestLedger.sequence - 17_280;
  }

  async getAccountDetails(address: string): Promise<StellarSdk.Account> {
    try {
      return await this._rpcServer.getAccount(address);
    } catch (error) {
      throw new Error(`Error loading account: ${error.message}`);
    }
  }

  async getLast10ContractEvents(
    contractId: string,
    startLedger: number,
  ): Promise<[] | EventResponse[]> {
    try {
      const eventFilters: Api.EventFilter[] = [
        {
          type: 'contract',
          contractIds: [contractId],
        },
      ];

      const eventRequest: rpc.Server.GetEventsRequest = {
        filters: eventFilters,
        startLedger: startLedger,
        limit: 10,
      };

      return await this._rpcServer
        .getEvents(eventRequest)
        .then(this.successfulRequestEventHandler, (reason) =>
          this.logger.error(reason),
        )
        .then(() => []);
    } catch (error) {
      throw new Error(`Error loading account: ${error.message}`);
    }
  }

  /**
   * Handles `Api.GetEventsResponse` returned from the `RpcServer`
   * [getEvents](https://developers.stellar.org/docs/data/apis/rpc/api-reference/methods/getEvents) call.
   *
   * This method filters out non-contract events and validates required data is present.
   * A valid ` GetEventsResponse ` array is then returned.
   *
   * @param eventResponse - Successful response from the `RpcServer`
   * @returns An array of `GetEventsResponse`
   * @throws Error in case of invalid data
   */
  private successfulRequestEventHandler(
    eventResponse: Api.GetEventsResponse,
  ): EventResponse[] {
    const events: Api.EventResponse[] = eventResponse.events;
    if (events.length === 0) return [];

    this.logger.log(events);

    return events
      .map((event: Api.EventResponse) => event as Api.EventResponse)
      .filter((event) => event.type === 'contract')
      .filter((event) => this.contractDataIsDefined(event))
      .sort(this.decendingTimestampSort());
  }

  /**
   * Predicate filter that Validates that all required fields are present
   * in an `Api.EventResponse`.
   *
   * @param eventResponse - The event response to validate
   * @returns True if all required fields (contractId, id, value) are defined
   */
  contractDataIsDefined = (eventResponse: Api.EventResponse) =>
    eventResponse.contractId !== undefined &&
    eventResponse.contractId !== null &&
    eventResponse.id !== undefined &&
    eventResponse.id !== null &&
    eventResponse.value !== undefined &&
    eventResponse.value !== null;

  decendingTimestampSort(): (a: EventResponse, b: EventResponse) => number {
    return (a, b) => {
      if (a.ledgerClosedAt < b.ledgerClosedAt) return -1;
      if (a.ledgerClosedAt > b.ledgerClosedAt) return 1;
      return 0;
    };
  }

  getMockContractEvent(
    contractId: string,
    startLedger: number,
  ): Api.EventResponse {
    try {
      return {
        type: xdr.ContractEventType.contract().name,
        ledger: startLedger,
        ledgerClosedAt: Date.now().toString(),
        contractId: new Contract(contractId),
        inSuccessfulContractCall: true,
        txHash:
          '86ad86ba26466e50b764cb7c0dab1082a5e1eec4e1cc82ae2bade7fbeb5d143f',
        topic: [
          xdr.ScVal.fromXDR('AAAADwAAAARtaW50', 'base64'),
          xdr.ScVal.fromXDR(
            'AAAAEgAAAAAAAAAAvBH8ODS0wMgqud9X6VGlvEVG9iQy4qjdlhXAHlneCtw=',
            'base64',
          ),
        ],
        value: xdr.ScVal.fromXDR('AAAAAwAAAIQ=', 'base64'),
      } as Api.EventResponse;
    } catch (error) {
      throw new Error(`Error generating mock contract event: ${error.message}`);
    }
  }
}
