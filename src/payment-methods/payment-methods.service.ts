import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentProvidersService } from 'src/payment-providers/payment-providers.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PaymentMethod } from './entities/payment-method.entity';

@Injectable()
export class PaymentMethodsService {
  constructor(
    private prisma: PrismaService,
    private paymentProvidersService: PaymentProvidersService
  ) { }

  async create(data: CreatePaymentMethodDto): Promise<PaymentMethod | Error> {
    const { providerId } = data;
    const providerExist = await this.paymentProvidersService.findOne(providerId);

    if (providerExist) {
      throw new NotFoundException('Provider does not exist.')
    }
    const method = await this.prisma.paymentMethod.create({
      data
    })
    return method;
  }


  async findByCode(code: string): Promise<PaymentMethod | null> {
    const method = await this.prisma.paymentMethod.findFirst({
      where: { code }
    })

    return method;
  }

  async findAll(): Promise<PaymentMethod[]> {
    const methods = await this.prisma.paymentMethod.findMany({})
    return methods;
  }

  async findOne(id: string): Promise<PaymentMethod | Error> {
    const method = await this.prisma.paymentMethod.findFirst({
      where: { id }
    })

    if (!method) {
      throw new NotFoundException('Method does not exist.')
    }
    return method;
  }

  async update(id: string, data: UpdatePaymentMethodDto): Promise<PaymentMethod | Error> {
    const method = await this.prisma.paymentMethod.findFirst({
      where: { id }
    })

    if (!method) {
      throw new NotFoundException('Method does not exist.')
    }

    const updateMethod = await this.prisma.paymentMethod.update({
      data,
      where: { id }
    })
    return updateMethod;
  }

  async delete(id: string): Promise<void> {
    const method = await this.findOne(id);
    if (!method) {
      throw new NotFoundException('Method does not exist.')
    }

    await this.prisma.paymentMethod.delete({
      where: { id }
    })
  }

}
