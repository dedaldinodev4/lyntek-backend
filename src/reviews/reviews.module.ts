import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';
import { BrandsService } from 'src/brands/brands.service';

@Module({
  controllers: [ReviewsController],
  providers: [
    ReviewsService, PrismaService, BrandsService,
    ProductsService, CategoriesService, UsersService
  ],
  exports: [ ReviewsService ]
})
export class ReviewsModule {}
