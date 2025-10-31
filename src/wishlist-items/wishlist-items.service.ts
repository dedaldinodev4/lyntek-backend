import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistItemDto } from './dto/create-wishlist-item.dto';
import { UpdateWishlistItemDto } from './dto/update-wishlist-item.dto';
import { ProductsService } from 'src/products/products.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { WishlistsService } from 'src/wishlists/wishlists.service';
import type { WishlistItem } from './entities/wishlist-item.entity';

@Injectable()
export class WishlistItemsService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductsService,
    private wishlistService: WishlistsService
  ) { }
  
  async create(data: CreateWishlistItemDto): Promise<WishlistItem | Error> {
    const { wishlistId, productId } = data;
    const wishlistExist = await this.wishlistService.findOne(wishlistId)
    const productExist = await this.productService.findOne(productId)

    if (!wishlistExist) {
      throw new NotFoundException('Wishlist does not exist.')
    }

    if (!productExist) {
      throw new NotFoundException('Product does not exist.')
    }

    const wishlistItem = await this.prisma.wishlistItem.create({ 
      data
    })
    return wishlistItem;
  }

  async findAll(): Promise<WishlistItem[]> {
    const wishlistItems = await this.prisma.wishlistItem.findMany({
      orderBy: { created_at: 'desc' }
    })
    return wishlistItems;
  }

  async findOne(id: string): Promise<WishlistItem | Error> {
    const wishlistItem = await this.prisma.wishlistItem.findFirst({
      where: { id }
    })

    if (!wishlistItem) {
      throw new NotFoundException('WishlistItem does not exist.')
    }

    return wishlistItem
  }

  async update(id: string, data: UpdateWishlistItemDto): Promise<WishlistItem | Error> {
    const wishlistItemExist = await this.findOne(id)
    if (!wishlistItemExist) {
      throw new NotFoundException('WishlistItem does not exist.')
    }
   
    const updateWishlistItem = await this.prisma.wishlistItem.update({
      data,
      where: { id }
    })
    return updateWishlistItem;
  }

  async delete(id: string): Promise<void> {
    const wishlistItem = await this.findOne(id);
    if (!wishlistItem) {
      throw new NotFoundException('WishlistItem does not exist.')
    }

    await this.prisma.wishlistItem.delete({
      where: { id }
    })
  }
}
