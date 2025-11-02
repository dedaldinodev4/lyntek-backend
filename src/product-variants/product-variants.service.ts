import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { ProductsService } from 'src/products/products.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductVariant } from './entities/product-variant.entity';
import type { ISetProductVariantOffer } from './dto/set-offer-product-variant';

@Injectable()
export class ProductVariantsService {
  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService) { }

  async create(data: CreateProductVariantDto): Promise<ProductVariant | Error> {
    const { sku, productId } = data;
    const variantExist = await this.findBySKU(sku)
    const product = await this.productsService.findOne(productId)

    if (!product) {
      throw new NotFoundException('Product does not exist.')
    }

    if (variantExist) {
      throw new BadRequestException('Variant already exist.')
    }

    const variant = await this.prisma.productVariant.create({
      data
    })
    return variant;
  }

  async findAll(): Promise<ProductVariant[]> {
    const variants = await this.prisma.productVariant.findMany({})
    return variants;
  }

  async findOne(id: string): Promise<ProductVariant | Error> {
    const variant = await this.prisma.productVariant.findFirst({
      where: { id }
    })

    if (!variant) {
      throw new NotFoundException('Variant does not exist.')
    }

    return variant
  }

  async findBySKU(sku: string): Promise<ProductVariant | null> {
    const variant = await this.prisma.productVariant.findFirst({
      where: { sku }
    })
    return variant;
  }

  async update(id: string, data: UpdateProductVariantDto): Promise<ProductVariant | Error> {
    
    const variantExist = await this.findOne(id)
    if (!variantExist) {
      throw new NotFoundException('Variant does not exist.')
    }
    if (data.sku && await this.findBySKU(data.sku)) {
      throw new BadRequestException('Variant already exist.')
    }
    const updateVariant = await this.prisma.productVariant.update({
      data,
      where: { id }
    })
    return updateVariant;
  }

  async setOffer(id: string, data: ISetProductVariantOffer): Promise<ProductVariant | Error> {
    
    const { offerExpires_at, discountPercent } = data;
    const variantExist = await this.findOne(id)
    if (!variantExist) {
      throw new NotFoundException('Variant does not exist.')
    }

    const setOfferVariant = await this.prisma.productVariant.update({
      data: {
        discountPercent,
        offerExpires_at: offerExpires_at ? new Date(offerExpires_at): null
      },
      where: { id }
    })

    return setOfferVariant;
  }

  async clearOffer(id: string): Promise<ProductVariant | Error> {
  
    const variantExist = await this.findOne(id)
    if (!variantExist) {
      throw new NotFoundException('Variant does not exist.')
    }

    const clearOfferVariant = await this.prisma.productVariant.update({
      data: {
        discountPercent: 0,
        offerExpires_at: null
      },
      where: { id }
    })

    return clearOfferVariant;
  }

  async delete (id: string): Promise<void> {
    const variant = await this.findOne(id)
    if (!variant) {
      throw new NotFoundException('Variant does not exist.')
    }
    const deleteVariant = await this.prisma.productVariant.delete({
      where: { id }
    })
  }
}
