import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { Order } from './entities/order.entity';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor (
    private prisma: PrismaService, 
    private userService: UsersService, 
    private addressService: AddressesService) {}

  async create (data: CreateOrderDto): Promise<Order | Error> {
    const { userId, addressId } = data;
    const user = await this.userService.findOne(userId)
    const address = await this.addressService.findOne(addressId)

    if (!user) {
      throw new NotFoundException('User does not exist.')
    }
    if (!address) {
      throw new NotFoundException('Address does not exist.')
    }
    const order = await this.prisma.order.create({
      data
    });
    return order;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({})
    return orders;
  }

  async findOne(id: string): Promise<Order | Error> {
    const order = await this.prisma.order.findFirst({
      where: { id }
    })

    if (!order) {
      throw new NotFoundException('Order does not exist.')
    }
    return order;
  }

  async update (id: string, data: UpdateOrderDto): Promise<Order | Error> {
    const order = await this.prisma.order.findFirst({
      where: { id }
    })

    if (!order) {
      throw new NotFoundException('Order does not exist.')
    }
    const updateOrder = await this.prisma.order.update({
      data,
      where: { id }
    })
    return updateOrder;
  }

  async setStatus (id: string, status: OrderStatus): Promise<Order> {
    const order = await this.prisma.order.update({
      data: { 
        status
      },
      where: { id }
    })

    return order
  }

  async delete(id: string): Promise<void> {
    const order = await this.prisma.order.findFirst({
      where: { id }
    })

    if (!order) {
      throw new NotFoundException('Order does not exist.')
    }
    const deleteOrder = await this.prisma.order.delete({
      where: { id }
    })
  }
}
