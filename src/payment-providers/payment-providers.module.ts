import { Module } from '@nestjs/common';
import { PaymentProvidersService } from './payment-providers.service';
import { PaymentProvidersController } from './payment-providers.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  controllers: [PaymentProvidersController],
  providers: [PaymentProvidersService, PrismaService],
  exports: [PaymentProvidersService]
})
export class PaymentProvidersModule {}
