import { Test, TestingModule } from '@nestjs/testing';
import { StellarMockEventService } from './stellar.mock.event.service';

describe('StellarMockEventService', () => {
  let service: StellarMockEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StellarMockEventService],
    }).compile();

    service = module.get<StellarMockEventService>(StellarMockEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
