import { Test, TestingModule } from '@nestjs/testing';
import { PaymentProvidersService } from './payment-providers.service';

describe('PaymentProvidersService', () => {
  let service: PaymentProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentProvidersService],
    }).compile();

    service = module.get<PaymentProvidersService>(PaymentProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
