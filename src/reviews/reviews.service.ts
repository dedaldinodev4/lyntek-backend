import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService, 
    private productService: ProductsService, 
    private usersService: UsersService) {}

  async create (data: CreateReviewDto): Promise<Review | Error> {
    const { productId, userId } = data;
    const user = await this.usersService.findOne(userId)
    const product = await this.productService.findOne(productId)
    
    if (!user) {
      throw new NotFoundException('User does not exist.')
    }
    
    if (!product) {
      throw new NotFoundException('User does not exist.')
    }

    const review = await this.prisma.review.create({
      data
    })
    return review;
  }

  async findAll(): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({})
    return reviews;
  }

  async findOne (id: string): Promise<Review | Error> {
    const review = await this.prisma.review.findFirst({
      where: { id }
    })

    if (!review) {
      throw new NotFoundException('Review does not exist.')
    }
    return review;
  }

  async update(id: string, data: UpdateReviewDto): Promise<Review | Error> {
    const review = await this.prisma.review.findFirst({
      where: { id }
    })

    if (!review) {
      throw new NotFoundException('Review does not exist.')
    }
    const updateReview = await this.prisma.review.update({
      data,
      where: { id }
    })
    return updateReview;
  }

  async delete (id: string): Promise<void> {
    const review = await this.prisma.review.findFirst({
      where: { id }
    })

    if (!review) {
      throw new NotFoundException('Review does not exist.')
    }
    const deleteReview = await this.prisma.review.delete({
      where: { id }
    })
  }
}
