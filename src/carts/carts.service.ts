import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Cart } from './entities/cart.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CartsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService) { }

  async create(data: CreateCartDto): Promise<Cart | Error> {
    const { userId } = data;
    const userExist = await this.usersService.findOne(userId);
    if (!userExist) {
      throw new NotFoundException('User does not exist.')
    }
    const cartExist = await this.findByUser(userId)
    if (cartExist) {
      throw new BadRequestException('Cart already exist.')
    }
    const cart = await this.prisma.cart.create({
      data
    })
    return cart;
  }

  async findByUser(userId: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findFirst({
      where: { userId }
    })
    return cart;
  }

  async findAll(): Promise<Cart[]> {
    const carts = await this.prisma.cart.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        }
      }
    })
    return carts;
  }

  async findOne(id: string): Promise<Cart | Error> {
    const cart = await this.prisma.cart.findFirst({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          }
        }
      }
    })
    if (!cart) {
      throw new NotFoundException('Cart does not exist.')
    }
    return cart;
  }

  async update(id: string, data: UpdateCartDto): Promise<Cart | Error> {
    const cart = await this.findOne(id)
    if (!cart) {
      throw new NotFoundException('Cart does not exist.')
    }
    const cartUpdate = await this.prisma.cart.update({
      data,
      where: { id }
    })
    return cartUpdate;
  }

  async delete(id: string): Promise<void> {
    const cart = await this.findOne(id)

    if (!cart) {
      throw new NotFoundException('Cart does not exist.')
    }
    await this.prisma.cart.delete({
      where: { id }
    })
  }
}
