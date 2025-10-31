import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  
  constructor(private prisma: PrismaService) { }
  
  async create(data: CreateCouponDto): Promise<Coupon| Error> {
    const { code } = data;
    const couponExist = await this.findByCode(code)

    if (couponExist) {
      throw new BadRequestException('Coupon already exist.')
    }

    const coupon = await this.prisma.coupon.create({ data })
    return coupon;
  }

  async findAll(): Promise<Coupon[]> {
    const coupons = await this.prisma.coupon.findMany({})
    return coupons;
  }

  async findOne(id: string): Promise<Coupon | Error> {
    const coupon = await this.prisma.coupon.findFirst({
      where: { id }
    })

    if (!coupon) {
      throw new NotFoundException('Coupon does not exist.')
    }

    return coupon
  }

  async findByCode(code: string): Promise<Coupon | null> {
    const coupon = await this.prisma.coupon.findFirst({
      where: { code }
    })
    return coupon;
  }


  async update(id: string, data: UpdateCouponDto): Promise<Coupon | Error> {
    const { code } = data;
    const couponExist = await this.findOne(id)
    const coupon = await this.findByCode(code)
    if (!couponExist) {
      throw new NotFoundException('Coupon does not exist.')
    }
    if (coupon) {
      throw new BadRequestException('Coupon already exist.')
    }
    const updateCoupon = await this.prisma.coupon.update({
      data,
      where: { id }
    })
    return updateCoupon;
  }

  async delete(id: string): Promise<void> {
    const coupon = await this.findOne(id);
    if (!coupon) {
      throw new NotFoundException('Coupon does not exist.')
    }

    await this.prisma.coupon.delete({
      where: { id }
    })
  }
}
