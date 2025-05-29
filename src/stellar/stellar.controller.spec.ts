import { Test, TestingModule } from '@nestjs/testing';
import { StellarMockEventController } from './stellar.mock.event.controller';

describe('StellarController', () => {
  let controller: StellarMockEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StellarMockEventController],
    }).compile();

    controller = module.get<StellarMockEventController>(StellarMockEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
