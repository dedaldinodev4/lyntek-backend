import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import type { ProductDetail } from './entities/product-detail.entity';
import type { PaginationDto } from 'src/common/dtos/pagination.dto';

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

  async findAll(pagination: PaginationDto): Promise<any> {
    const { page, limit} = pagination;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const [items, total] = await Promise.all([
      this.prisma.productDetails.findMany({
        skip,
        take: limitNumber,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.productDetails.count(),
    ]);

    return {
      data: items,
      meta: {
        total,
        page: pageNumber,
        lastPage: Math.ceil(total / limitNumber),
        limit: limitNumber,
      },
    };
  }

  async findByProduct(productId: string): Promise<ProductDetail | Error> {
    const productDetail = await this.prisma.productDetails.findFirst({
      where: {
        productId
      }
    })
    if (!productDetail) {
      throw new NotFoundException(`ProductDetail does not exist.`)
    }
    return productDetail;
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

  async delete(id: string): Promise<void> {
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
