import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {

  constructor(private prisma: PrismaService) { }
  
  async create (data: CreateBrandDto): Promise<Brand | Error> {
    const { name } = data;
    const brandExist = await this.findByName(name)
    if (brandExist) {
      throw new BadRequestException('Brand already exist.')
    }
    const brand = await this.prisma.brand.create({
      data
    })
    return brand;
  }

  async findByName (name: string): Promise<Brand | null> {
    const brand = await this.prisma.brand.findFirst({
      where: { name }
    })
    return brand;
  }

  async findAll (): Promise<Brand[]> {
    const brands = await this.prisma.brand.findMany({
      include: {
        _count: true,
      }
    })
    return brands;
  }

  async findOne(id: string): Promise<Brand | Error> {
    const brand = await this.prisma.brand.findFirst({
      where: { id }
    })

    if (!brand) {
      throw new NotFoundException('Brand does not exist.')
    }
    return brand;
  }

  async update(id: string, data: UpdateBrandDto): Promise<Brand | Error> {
    const { name } = data;
    const brandExist = await this.findOne(id)
    if (!brandExist) {
      throw new NotFoundException('Brand does not exist.')
    }

    if (data.name && await this.findByName(data.name)) {
      throw new BadRequestException('Brand already exist.')
    }
    const updateBrand = await this.prisma.brand.update({
      data, 
      where: { id }
    })
    return updateBrand;
  }

  async delete (id: string): Promise<void> {
    const brand = await this.findOne(id);
    const deleteBrand = await this.prisma.brand.delete({
      where: { id }
    })
  }

  async uploadCover (id: string, file: Express.Multer.File): Promise<Brand | Error> {
    const brand = await this.prisma.brand.findFirst({
      where: { id }
    })

    if (!brand) {
      throw new NotFoundException('Braand does not exist.')
    }

    if (!file) {
      throw new BadRequestException('No file provided')
    }
    const brandUpload = await this.prisma.brand.update({
      data: {
        cover: `uploads/brands/${file.filename}`
      },
      where: { id }
    })

    return brandUpload;

  }
  
}
