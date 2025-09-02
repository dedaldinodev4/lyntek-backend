import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentProviderDto } from './dto/create-payment-provider.dto';
import { UpdatePaymentProviderDto } from './dto/update-payment-provider.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { PaymentProvider } from './entities/payment-provider.entity';

@Injectable()
export class PaymentProvidersService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(data: CreatePaymentProviderDto): Promise<PaymentProvider | Error> {
    const { code } = data;
    const providerExist = await this.findByCode(code);

    if (providerExist) {
      throw new NotFoundException('Provider already exist.')
    }
    const provider = await this.prisma.paymentProvider.create({
      data
    })
    return provider;
  }


  async findByCode(code: string): Promise<PaymentProvider | null> {
    const provider = await this.prisma.paymentProvider.findFirst({
      where: { code }
    })

    return provider;
  }

  async findAll(): Promise<PaymentProvider[]> {
    const providers = await this.prisma.paymentProvider.findMany({
      include: {
        methods: true
      }
    })
    return providers;
  }

  async findOne(id: string): Promise<PaymentProvider | Error> {
    const provider = await this.prisma.paymentProvider.findFirst({
      where: { id },
      include: {
        methods: true
      }
    })

    if (!provider) {
      throw new NotFoundException('Provider does not exist.')
    }
    return provider;
  }

  async update(id: string, data: UpdatePaymentProviderDto): Promise<PaymentProvider | Error> {
    const provider = await this.prisma.paymentProvider.findFirst({
      where: { id }
    })

    if (!provider) {
      throw new NotFoundException('Provider does not exist.')
    }

    const updateProvider = await this.prisma.paymentProvider.update({
      data,
      where: { id }
    })
    return updateProvider;
  }

  async delete(id: string): Promise<void> {
    const provider = await this.findOne(id);
    if (!provider) {
      throw new NotFoundException('Provider does not exist.')
    }

    await this.prisma.paymentProvider.delete({
      where: { id }
    })
  }

}
