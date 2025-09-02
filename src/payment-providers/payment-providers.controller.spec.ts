import { Test, TestingModule } from '@nestjs/testing';
import { PaymentProvidersController } from './payment-providers.controller';
import { PaymentProvidersService } from './payment-providers.service';

describe('PaymentProvidersController', () => {
  let controller: PaymentProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentProvidersController],
      providers: [PaymentProvidersService],
    }).compile();

    controller = module.get<PaymentProvidersController>(PaymentProvidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
