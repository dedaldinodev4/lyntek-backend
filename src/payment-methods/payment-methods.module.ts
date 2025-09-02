import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsController } from './payment-methods.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PaymentProvidersService } from 'src/payment-providers/payment-providers.service';

@Module({
  controllers: [PaymentMethodsController],
  providers: [
    PaymentMethodsService, PrismaService, PaymentProvidersService],
})
export class PaymentMethodsModule {}
