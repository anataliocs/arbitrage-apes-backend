import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StellarGateway {
  private readonly logger = new Logger(StellarGateway.name);

  private readonly debug: boolean = true;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
}
