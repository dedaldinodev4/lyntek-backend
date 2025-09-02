import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrdersService } from 'src/orders/orders.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrderItemsService {
  constructor (
    private prisma: PrismaService, 
    private ordersService: OrdersService, 
    private productsService: ProductsService) {}

  async create (data: CreateOrderItemDto): Promise<OrderItem | Error> {
    const { orderId, productId } = data;

    const order = await this.ordersService.findOne(orderId)
    const product = await this.productsService.findOne(productId)

    if (!order) {
      throw new NotFoundException('Order does not exist.')
    } 

    if (!product) {
      throw new NotFoundException('Product does not exist.')
    } 
    const orderItem = await this.prisma.orderItem.create({
      data
    })
    return orderItem;
  }

  async findAll(): Promise<OrderItem[]> {
    const orderItems = await this.prisma.orderItem.findMany({})
    return orderItems;
  }

  async findOne(id: string): Promise<OrderItem | Error> {
    const orderItem = await this.prisma.orderItem.findFirst({
      where: { id }
    })

    if (!orderItem) {
      throw new NotFoundException('OrderItem does not exist.')
    }
    return orderItem;
  }

  async update(id: string, data: UpdateOrderItemDto): Promise<OrderItem | Error> {
    const orderItem = await this.prisma.orderItem.findFirst({
      where: { id }
    })

    if (!orderItem) {
      throw new NotFoundException('OrderItem does not exist.')
    }
    const updateOrderItem = await this.prisma.orderItem.update({
      data,
      where: { id }
    })
    return updateOrderItem;
  }

  async delete (id: string): Promise<void> {
    const orderItem = await this.prisma.orderItem.findFirst({
      where: { id }
    })

    if (!orderItem) {
      throw new NotFoundException('OrderItem does not exist.')
    }
    const deleteOrderItem = await this.prisma.orderItem.delete({
      where: { id }
    })
  }
}
