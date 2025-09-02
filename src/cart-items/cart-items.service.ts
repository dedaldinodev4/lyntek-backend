import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { CartsService } from 'src/carts/carts.service';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartItemsService {

  constructor(
    private prisma: PrismaService, 
    private productService: ProductsService, 
    private cartService: CartsService) {}

async create(data: CreateCartItemDto): Promise<CartItem| Error> {
  const { cartId, productId } = data;
  const cart =  await this.cartService.findOne(cartId)
  const product = await this.productService.findOne(productId)
  
  if (!cart) {
    throw new NotFoundException('Cart does not exist.')
  }
  
  if (!product) {
    throw new NotFoundException('Product does not exist.')
  }
  const cartItem = await this.prisma.cartItem.create({
    data
  })

  return cartItem;
  }

  async findAll(): Promise<CartItem[]> {
    const cartItems = await this.prisma.cartItem.findMany({
      orderBy: { created_at: 'asc'}
    })
    return cartItems;
  }

  async findOne(id: string): Promise<CartItem | Error> {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { id }
    })

    if (!cartItem) {
      throw new NotFoundException('CartItem does not exist.')
    }
    return cartItem
  }

  async update(id: string, data: UpdateCartItemDto): Promise<CartItem | Error> {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { id }
    })

    if (!cartItem) {
      throw new NotFoundException('CartItem does not exist.')
    }

    const updateCartItem = await this.prisma.cartItem.update({
      data,
      where: { id }
    })
    return updateCartItem;
  }

  async delete(id: string): Promise <void> {
    const cartItem = await this.prisma.cartItem.findFirst({
      where: { id }
    })

    if (!cartItem) {
      throw new NotFoundException('CartItem does not exist.')
    }
    const deleteCartItem = await this.prisma.cartItem.delete({
      where: { id }
    })    
  }
}
