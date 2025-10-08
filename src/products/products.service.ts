import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';
import { Product, type IProductPaginated } from './entities/product.entity';
import { BrandsService } from 'src/brands/brands.service';
import type { ProductQueryDto } from './dto/query-product.dto';
import { parseNumberParam } from 'src/utils/parseNumber';

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
      where: { name },
      include: { 
        brand: true,
        category: true,
        images: true,
        reviews: true,
        variants: true, 
        productDetails: true,
      }
    })

    return product;
  }

  async findAll(query: ProductQueryDto): Promise<IProductPaginated> {

    const { page, limit, search, sort, minPrice, maxPrice } = query;

    const currentPage = parseNumberParam(page) || 1;
    const perPage = parseNumberParam(limit) || 10;
    const skip = (currentPage - 1) * perPage;
    const where: any = {};

    //* Dynamic Filters *//
    if (search) {
      where.OR = [
        { name: { contains: search} },
        { description: { contains: search } },
      ];
    }

    //* Dynamic Sort *//
    let orderBy: any = { created_at: 'desc' }; 
    if (sort) {
      const [field, direction] = sort.split(':');
      orderBy = { [field]: direction === 'asc' ? 'asc' : 'desc' };
    }

    const [items, totalResults] = await Promise.all([
      this.prisma.product.findMany({
        include: { 
          brand: true,
          category: true,
          images: { orderBy: { created_at: 'asc' }},
          reviews: true,
          variants: true, 
          productDetails: true,
        },
        skip,
        take: perPage,
        where,
        orderBy,
      }),
      this.prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(totalResults / perPage);
    const totalCurrentResults = items.length;

    return {
      data: items,
      paginator: {
        currentPage,
        pages: totalPages,
        nextPage: currentPage < totalPages ? currentPage + 1 : null,
        prevPage: currentPage > 1 ? currentPage - 1 : null,
        perPage,
        totalResults,
        totalCurrentResults,
        lastPage: Math.ceil(totalResults/perPage),
      },
    };
   
  }

  async findOne(id: string): Promise<Product | Error> {
    const product = await this.prisma.product.findFirst({
      where: { id },
      include: { 
        brand: true,
        category: true,
        images: true,
        reviews: true,
        variants: true, 
        productDetails: true,
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
