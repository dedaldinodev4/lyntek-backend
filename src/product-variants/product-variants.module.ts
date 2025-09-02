import { Module } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariantsController } from './product-variants.controller';
import { ProductsService } from 'src/products/products.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService, PrismaService, 
    BrandsService, CategoriesService, ProductsService
  ],
})
export class ProductVariantsModule {}
