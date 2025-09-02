import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CartsService } from 'src/carts/carts.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';
import { BrandsService } from 'src/brands/brands.service';

@Module({
  controllers: [CartItemsController],
  providers: [
    CartItemsService, 
    PrismaService,
    CategoriesService, 
    BrandsService,
    UsersService,
    CartsService, 
    ProductsService
  ],
  exports: [CartItemsService]
})
export class CartItemsModule {}
