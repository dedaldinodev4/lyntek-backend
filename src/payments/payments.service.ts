import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { OrdersService } from 'src/orders/orders.service';
import { Payment } from './entities/payment.entity';
import { PaymentStatus } from '@prisma/client';
import { PaymentProvidersService } from 'src/payment-providers/payment-providers.service';
import { PaymentMethodsService } from 'src/payment-methods/payment-methods.service';

@Injectable()
export class PaymentsService {
  constructor (
    private prisma: PrismaService, 
    private ordersService: OrdersService,
    private providersService: PaymentProvidersService,
    private methodsService: PaymentMethodsService
  ) {}

  async create (data: CreatePaymentDto):Promise<Payment | Error > {
    const { orderId, providerId, methodId } = data;
    const order = await this.ordersService.findOne(orderId);
    const provider  = await this.providersService.findOne(providerId)
    const method  = await this.methodsService.findOne(methodId)
    
    if (!order) {
      throw new NotFoundException('Order does not exist.')
    }
    if (!provider) {
      throw new NotFoundException('Payment provider does not exist.')
    }
    if (!method) {
      throw new NotFoundException('Payment method does not exist.')
    }
    const payment = await this.prisma.payment.create({
      data
    })
    return payment;
  }

  async findAll(): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      include: {
        provider: true,
        method: true,
        order: true
      }
    })
    return payments;
  }

  async findOne(id: string): Promise<Payment | Error > {
    const payment = await this.prisma.payment.findFirst({
      where: { id },
      include: {
        provider: true,
        method: true,
        order: true
      }
    })

    if (!payment) {
      throw new NotFoundException('Payment does not exist.')
    }
    return payment;
  }

  async update (id: string, data: UpdatePaymentDto): Promise<Payment | Error > {
    const payment = await this.prisma.payment.findFirst({
      where: { id }
    })

    if (!payment) {
      throw new NotFoundException('Payment does not exist.')
    }
    const updatePayment = await this.prisma.payment.update({
      data,
      where: { id }
    })
    return updatePayment;
  }

  async setStatus (id: string, status: PaymentStatus): Promise<Payment | Error > {
    const payment = await this.prisma.payment.findFirst({
      where: { id }
    })

    if (!payment) {
      throw new NotFoundException('Payment does not exist.')
    }
    const updatePayment = await this.prisma.payment.update({
      data: { status },
      where: { id }
    })
    return updatePayment;
  }

  async delete (id: string): Promise<void> {
    const payment = await this.prisma.payment.findFirst({
      where: { id }
    })

    if (!payment) {
      throw new NotFoundException('Payment does not exist.')
    }
    const deletePayment = await this.prisma.payment.delete({
      where: { id }
    })
    
  }
}
