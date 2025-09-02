import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Carrier } from './entities/carrier.entity';

@Injectable()
export class CarrierService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateCarrierDto): Promise<Carrier | Error> {
    const { code } = data;
    const carrierExist = await this.findByCode(code)

    if (carrierExist) {
      throw new BadRequestException('Carrier already exist.')
    }

    const carrier = await this.prisma.carrier.create({ data })
    return carrier;
  }

  async findAll(): Promise<Carrier[]> {
    const carrier = await this.prisma.carrier.findMany({})
    return carrier;
  }

  async findOne(id: string): Promise<Carrier | Error> {
    const carrier = await this.prisma.carrier.findFirst({
      where: { id }
    })

    if (!carrier) {
      throw new NotFoundException('Carrier does not exist.')
    }

    return carrier;
  }

  async findByCode(code: string): Promise<Carrier | null> {
    const carrier = await this.prisma.carrier.findFirst({
      where: { code }
    })
    return carrier;
  }

  async update(id: string, data: UpdateCarrierDto): Promise<Carrier | Error> {
    const carrierExist = await this.findOne(id)
  
    if (!carrierExist) {
      throw new NotFoundException('Carrier does not exist.')
    }
    if (data.code && await this.findByCode(data.code)) {
      throw new BadRequestException('Carrier already exist.')
    }
    const updateCarrier = await this.prisma.carrier.update({
      data,
      where: { id }
    })
    return updateCarrier;
  }

  async delete(id: string): Promise<void> {
    const carrier = await this.findOne(id);
    if (!carrier) {
      throw new NotFoundException('Carrier does not exist.')
    }

    await this.prisma.carrier.delete({
      where: { id }
    })
  }
}
