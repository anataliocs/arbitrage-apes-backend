import { Test, TestingModule } from '@nestjs/testing';
import { StellarTestnetEventService } from './stellar.testnet.event.service';

describe('TestnetService', () => {
  let service: StellarTestnetEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StellarTestnetEventService],
    }).compile();

    service = module.get<StellarTestnetEventService>(StellarTestnetEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
