import { Module } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { ProductImagesController } from './product-images.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { BrandsService } from 'src/brands/brands.service';

@Module({
  controllers: [ProductImagesController],
  providers: [
    ProductImagesService, 
    PrismaService,
    CategoriesService,
    BrandsService,
    ProductsService
  ],
})
export class ProductImagesModule {}
