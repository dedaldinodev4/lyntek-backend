import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponUsageDto } from './dto/create-coupon-usage.dto';
import { UpdateCouponUsageDto } from './dto/update-coupon-usage.dto';
import { CouponUsage, type CouponUsageTotal } from './entities/coupon-usage.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CouponsService } from 'src/coupons/coupons.service';
import { UsersService } from 'src/users/users.service';



@Injectable()
export class CouponUsagesService {
  constructor(
    private prisma: PrismaService,
    private couponsService: CouponsService,
    private usersService: UsersService
  ) { }
  
  async create(data: CreateCouponUsageDto): Promise<CouponUsage | Error> {
    const { couponId, userId } = data;
    const couponExist = await this.couponsService.findOne(couponId)
    const userExist = await this.usersService.findOne(userId)

    if (!couponExist) {
      throw new BadRequestException('Coupon does not exist.')
    }
    
    if (!userExist) {
      throw new BadRequestException('User does not exist.')
    }

    const couponUsage = await this.prisma.couponUsage.create({ data })
    return couponUsage;
  }

  async findAll(): Promise<CouponUsage[]> {
    const couponUsages = await this.prisma.couponUsage.findMany({})
    return couponUsages;
  }

  async totalUsages(couponId: string): Promise<CouponUsageTotal> {
    const usages = await this.prisma.couponUsage.findMany({
      where: { couponId }
    })
    const total = usages.reduce((s, u) => s + u.count, 0);
    return {
      usages, total
    }
  }

  async findOne(id: string): Promise<CouponUsage | Error> {
    const couponUsage = await this.prisma.couponUsage.findFirst({
      where: { id }
    })

    if (!couponUsage) {
      throw new NotFoundException('CouponUsage does not exist.')
    }

    return couponUsage
  }

  async findByCoupon(couponId: string): Promise<CouponUsage[]> {
    const couponUsages = await this.prisma.couponUsage.findMany({
      where: { couponId }
    })
    return couponUsages;
  }

  async findByUser(userId: string): Promise<CouponUsage[]> {
    const couponUsages = await this.prisma.couponUsage.findMany({
      where: { userId }
    })
    return couponUsages;
  }


  async update(id: string, data: UpdateCouponUsageDto): Promise<CouponUsage | Error> {
    const couponUsageExist = await this.findOne(id)
 
    if (!couponUsageExist) {
      throw new NotFoundException('CouponUsage does not exist.')
    }

    const updateCouponUsage = await this.prisma.couponUsage.update({
      data,
      where: { id }
    })
    return updateCouponUsage;
  }

  async delete(id: string): Promise<void> {
    const couponUsage = await this.findOne(id);
    if (!couponUsage) {
      throw new NotFoundException('CouponUsage does not exist.')
    }

    await this.prisma.couponUsage.delete({
      where: { id }
    })
  }
}
