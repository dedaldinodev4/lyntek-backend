import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { OrdersService } from 'src/orders/orders.service';
import { UsersService } from 'src/users/users.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { CarrierService } from 'src/carrier/carrier.service';

@Module({
  controllers: [ShipmentsController],
  providers: [ShipmentsService,
    PrismaService,
    UsersService,
    AddressesService,
    OrdersService,
    CarrierService
  ],
})
export class ShipmentsModule {}
