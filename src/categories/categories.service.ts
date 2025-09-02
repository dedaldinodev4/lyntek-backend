import { 
  BadRequestException, Injectable, NotFoundException
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateCategoryDto): Promise<Category | Error> {
    const { name } = data;
    const categoryExist = await this.findByName(name)

    if (categoryExist) {
      throw new BadRequestException('Category already exist.')
    }

    const category = await this.prisma.category.create({ data })
    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({})
    return categories;
  }

  async findOne(id: string): Promise<Category | Error> {
    const category = await this.prisma.category.findFirst({
      where: { id }
    })

    if (!category) {
      throw new NotFoundException('Category does not exist.')
    }

    return category
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: { name }
    })
    return category;
  }

  async update(id: string, data: UpdateCategoryDto): Promise<Category | Error> {
    const { name } = data;
    const categoryExist = await this.findOne(id)
    const category = await this.findByName(name)
    if (!categoryExist) {
      throw new NotFoundException('Category does not exist.')
    }
    if (category) {
      throw new BadRequestException('Category already exist.')
    }
    const updateCategory = await this.prisma.category.update({
      data,
      where: { id }
    })
    return updateCategory;
  }

  async delete(id: string): Promise<void> {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('Category does not exist.')
    }

    await this.prisma.category.delete({
      where: { id }
    })
  }

  async uploadCover (id: string, file: Express.Multer.File): Promise<Category | Error> {
    const category = await this.prisma.category.findFirst({
      where: { id }
    })

    if (!category) {
      throw new NotFoundException('Category does not exist.')
    }

    if (!file) {
      throw new BadRequestException('No file provided')
    }
    const categoryUpload = await this.prisma.category.update({
      data: {
        cover: `/public/uploads/categories/${file.filename}`
      },
      where: { id }
    })

    return categoryUpload;

  } 



}
