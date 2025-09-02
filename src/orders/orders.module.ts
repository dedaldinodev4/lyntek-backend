import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AddressesService } from 'src/addresses/addresses.service';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    PrismaService,
    UsersService,
    AddressesService
  ],
  exports: [OrdersService]
})
export class OrdersModule {}
