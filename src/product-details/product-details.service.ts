import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import type { PrismaService } from 'src/database/prisma/prisma.service';
import type { ProductsService } from 'src/products/products.service';
import type { ProductDetail } from './entities/product-detail.entity';

@Injectable()
export class ProductDetailsService {

  constructor(
    private prisma: PrismaService,
    private productService: ProductsService
  ) { }

  async create(data: CreateProductDetailDto): Promise<ProductDetail | Error> {
    const { productId } = data;
    const productExist = await this.productService.findOne(productId)
    if (!productExist) {
      throw new NotFoundException('Product does not exist.')
    }
    const productDetail = await this.prisma.productDetails.create({
      data
    })
    return productDetail;
  }

  async findAll(): Promise<ProductDetail[]> {
    const productDetails = await this.prisma.productDetails.findMany({
      orderBy: { created_at: 'desc' }
    })
    return productDetails;
  }

  async findOne(id: string): Promise<ProductDetail | Error> {
    const productDetail = await this.prisma.productDetails.findFirst({
      where: {
        id
      }
    })
    if (!productDetail) {
      throw new NotFoundException(`ProductDetail does not exist.`)
    }
    return productDetail;
  }

  async update(id: string, data: UpdateProductDetailDto): Promise<ProductDetail | Error> {
    const productDetailExist = await this.findOne(id)
    if (!productDetailExist) {
      throw new NotFoundException(`ProductDetail does not exist.`)
    }
    const productDetail = await this.prisma.productDetails.update({
      data,
      where: {
        id
      }
    })
    return productDetail;
  }

  async remove(id: string): Promise<void> {
    const productDetailExist = await this.findOne(id)
    if (!productDetailExist) {
      throw new NotFoundException(`ProductDetail does not exist.`)
    }
    const deleteProductDetail = await this.prisma.productDetails.delete({
      where: {
        id
      }
    })
  }
}
