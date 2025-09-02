import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/users.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { BrandsService } from 'src/brands/brands.service';

@Module({
  controllers: [OrderItemsController],
  providers: [
    OrderItemsService, PrismaService, BrandsService,
    CategoriesService, UsersService, 
    ProductsService, AddressesService, OrdersService
  ],
})
export class OrderItemsModule {}
