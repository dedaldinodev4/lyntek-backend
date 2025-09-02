import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';
import { BrandsService } from 'src/brands/brands.service';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService, 
    PrismaService, CategoriesService, BrandsService
  ],
  exports: [ProductsService]
})
export class ProductsModule {}
