import { Test, TestingModule } from '@nestjs/testing';
import { StellarTestnetEventController } from './stellar.testnet.event.controller';

describe('TestnetEventControllerController', () => {
  let controller: StellarTestnetEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StellarTestnetEventController],
    }).compile();

    controller = module.get<StellarTestnetEventController>(StellarTestnetEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
