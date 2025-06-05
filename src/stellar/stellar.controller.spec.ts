import { Test, TestingModule } from '@nestjs/testing';
import { StellarMockEventSseController } from './stellar.mock.event.sse.controller';

describe('StellarController', () => {
  let controller: StellarMockEventSseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StellarMockEventSseController],
    }).compile();

    controller = module.get<StellarMockEventSseController>(
      StellarMockEventSseController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
