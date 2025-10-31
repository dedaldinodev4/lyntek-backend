import { Module } from '@nestjs/common';
import { WishlistItemsService } from './wishlist-items.service';
import { WishlistItemsController } from './wishlist-items.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { WishlistsService } from 'src/wishlists/wishlists.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [WishlistItemsController],
  providers: [
    WishlistItemsService, PrismaService,
    WishlistsService, ProductsService,
    CategoriesService, BrandsService, UsersService,
  ],
})
export class WishlistItemsModule {}
