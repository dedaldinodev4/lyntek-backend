import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';
import { Product } from './entities/product.entity';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoriesService,
    private brandService: BrandsService
  ) { }

  async create(data: CreateProductDto): Promise<Product | Error> {
    const { categoryId, name, brandId } = data;
    const category = await this.categoryService.findOne(categoryId)
    const brand = await this.brandService.findOne(brandId)
    if (!category) {
      throw new NotFoundException('Category does not exist.')
    }
    if (!brand) {
      throw new NotFoundException('Brand does not exist.')
    }
    const productExist = await this.findByName(name);

    if (productExist) {
      throw new BadRequestException('Product already exist.')
    }
    const product = await this.prisma.product.create({
      data
    })
    return product;
  }


  async findByName(name: string): Promise<Product | null> {
    const product = await this.prisma.product.findFirst({
      where: { name }
    })

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        category: {
          select: { id: true, name: true, slug: true, cover: true }
        },
        brand: {
          select: { id: true, name: true, slug: true }
        },
        variants: true,
        images: true
      }
    })
    return products;
  }

  async findOne(id: string): Promise<Product | Error> {
    const product = await this.prisma.product.findFirst({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true, slug: true, cover: true }
        },
        brand: {
          select: { id: true, name: true, slug: true }
        },
        variants: true,
        images: true
      }
    })

    if (!product) {
      throw new NotFoundException('Product does not exist.')
    }
    return product;
  }

  async update(id: string, data: UpdateProductDto): Promise<Product | Error> {
    const product = await this.prisma.product.findFirst({
      where: { id }
    })

    if (!product) {
      throw new NotFoundException('Product does not exist.')
    }

    const updateProduct = await this.prisma.product.update({
      data,
      where: { id }
    })
    return updateProduct;
  }

  async delete(id: string): Promise<void> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Product does not exist.')
    }

    await this.prisma.product.delete({
      where: { id }
    })
  }
}
