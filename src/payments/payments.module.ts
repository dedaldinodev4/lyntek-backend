import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { OrdersService } from 'src/orders/orders.service';
import { UsersService } from 'src/users/users.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { PaymentProvidersService } from 'src/payment-providers/payment-providers.service';
import { PaymentMethodsService } from 'src/payment-methods/payment-methods.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService,
    PrismaService, UsersService, 
    AddressesService, OrdersService, 
    PaymentProvidersService, PaymentMethodsService
  ],
})
export class PaymentsModule {}
