import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor (
    private prisma: PrismaService, 
    private usersService: UsersService) {}

  async create(data: CreateAddressDto): Promise<Address | Error> {
    const { userId } = data;
    const user = await this.usersService.findOne(userId)
    if (!user) {
      throw new NotFoundException('User does not exist.')
    }
    const address = await this.prisma.address.create({
      data
    })
    return address;
  }

  async findAll(): Promise<Address[]> {
    const addresses = await this.prisma.address.findMany({})
    return addresses;
  }

  async findOne(id: string): Promise<Address | Error> {

    const address = await this.prisma.address.findFirst({
      where: { id }
    })

    if (!address) {
      throw new NotFoundException('Address does not exist.')
    }

    return address;
  }

  async update(id: string, data: UpdateAddressDto): Promise<Address | Error> {
    const address = await this.prisma.address.findFirst({
      where: { id }
    })

    if (!address) {
      throw new NotFoundException('Address does not exist.')
    }
    const updateAddress = await this.prisma.address.update({
      data,
      where: { id }
    })
    return updateAddress;
  }

  async delete (id: string): Promise<void> {
    const address = await this.prisma.address.findFirst({
      where: { id }
    })

    if (!address) {
      throw new NotFoundException('Address does not exist.')
    }

    const deleteAddress = await this.prisma.address.delete({
      where: { id }
    })
  }
}
