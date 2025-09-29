import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductImagesService {
  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService) { }

  async create(productId: string, file: Express.Multer.File): Promise<ProductImage | Error> {
    
    const product = await this.productsService.findOne(productId);

    if (!product) {
      throw new NotFoundException('Product does not exist.')
    }
    if (!file) {
      throw new BadRequestException('File does not provided.')
    }

    const productImage = await this.prisma.productImage.create({
      data: {
        url: `uploads/products/${file.filename}`,
        productId
      }
    })

    return productImage;
  }

  async findAll(): Promise<ProductImage[]> {
    const productImages = await this.prisma.productImage.findMany({})
    return productImages;
  }

  async findOne(id: string): Promise<ProductImage | Error> {
    const productImage = await this.prisma.productImage.findFirst({
      where: { id }
    })

    if (!productImage) {
      throw new NotFoundException('Image does not exist.');
    }
    return productImage;
  }

  async update(id: string, data: UpdateProductImageDto): Promise<ProductImage | Error> {
    const productImage = await this.prisma.productImage.findFirst({
      where: { id }
    })

    if (!productImage) {
      throw new NotFoundException('Image does not exist.');
    }
    const updateProductImage = await this.prisma.productImage.update({
      data,
      where: { id }
    })

    return updateProductImage;
  }

  async delete(id: string): Promise<void> {

    const productImage = await this.prisma.productImage.findFirst({
      where: { id }
    })

    if (!productImage) {
      throw new NotFoundException('Image does not exist.');
    }
    const deleteProductImage = await this.prisma.productImage.delete({
      where: { id }
    })
  }
}
