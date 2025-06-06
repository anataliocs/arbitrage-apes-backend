import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StellarWebsocketGateway {
  private readonly logger = new Logger(StellarWebsocketGateway.name);

  private readonly debug: boolean = true;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
}
