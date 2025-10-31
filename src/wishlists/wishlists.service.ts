import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Wishlist } from './entities/wishlist.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WishlistsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService
  ) { }
  
  async create(data: CreateWishlistDto): Promise<Wishlist | Error> {
    const { userId } = data;
    const userExist = await this.userService.findOne(userId)

    if (!userExist) {
      throw new NotFoundException('User does not exist.')
    }

    const wishlist = await this.prisma.wishlist.create({ 
      data
    })
    return wishlist;
  }

  async findAll(): Promise<Wishlist[]> {
    const wishlists = await this.prisma.wishlist.findMany({
      orderBy: { created_at: 'desc' }
    })
    return wishlists;
  }

  async findOne(id: string): Promise<Wishlist | Error> {
    const wishlist = await this.prisma.wishlist.findFirst({
      where: { id },
      include: {
        items: true
      }
    })

    if (!wishlist) {
      throw new NotFoundException('Wishlist does not exist.')
    }

    return wishlist
  }

  async findByUser(userId: string): Promise<Wishlist | null> {
    const wishlist = await this.prisma.wishlist.findFirst({
      where: { userId },
      include: {
        items: true
      }
    })
    return wishlist;
  }


  async update(id: string, data: UpdateWishlistDto): Promise<Wishlist | Error> {
    const wishlistExist = await this.findOne(id)
    if (!wishlistExist) {
      throw new NotFoundException('Wishlist does not exist.')
    }
   
    const updateWishlist = await this.prisma.wishlist.update({
      data,
      where: { id }
    })
    return updateWishlist;
  }

  async delete(id: string): Promise<void> {
    const wishlist = await this.findOne(id);
    if (!wishlist) {
      throw new NotFoundException('Wishlist does not exist.')
    }

    await this.prisma.wishlist.delete({
      where: { id }
    })
  }
}
