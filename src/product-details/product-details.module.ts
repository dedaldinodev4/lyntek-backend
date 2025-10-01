import { Module } from '@nestjs/common';
import { ProductDetailsService } from './product-details.service';
import { ProductDetailsController } from './product-details.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { BrandsService } from 'src/brands/brands.service';

@Module({
  controllers: [ProductDetailsController],
  providers: [
    ProductDetailsService,
    PrismaService,
    CategoriesService,
    BrandsService,
    ProductsService
  ],
  
})
export class ProductDetailsModule {}
