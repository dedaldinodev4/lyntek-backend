import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Coupon, type ICouponValidateResponse } from './entities/coupon.entity';
import { IValidateCouponDTO } from './dto/validate-coupon.dto';

@Injectable()
export class CouponsService {
  
  constructor(private prisma: PrismaService) { }
  
  async create(data: CreateCouponDto): Promise<Coupon| Error> {
    const { code, expires_at } = data;
    const couponExist = await this.findByCode(code)

    if (couponExist) {
      throw new BadRequestException('Coupon already exist.')
    }

    const coupon = await this.prisma.coupon.create({ 
      data: {
        ...data,
        expires_at: new Date(expires_at),
        code: code.toUpperCase()
      } 
    })
    return coupon;
  }

  async findAll(): Promise<Coupon[]> {
    const coupons = await this.prisma.coupon.findMany({
      orderBy: { created_at: 'desc' },
      where: { active: true }
    })
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
      where: { code: code.toUpperCase() }
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
      data: {
        ...data,
        code: data.code.toUpperCase(),
        expires_at: new Date(data.expires_at)
      },
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

  async desactivate(id: string): Promise<Coupon | Error> {
    const couponExist = await this.findOne(id);
    if (!couponExist) {
      throw new NotFoundException('Coupon does not exist.')
    }

    const coupon = await this.prisma.coupon.update({
      data: {
        active: false
      },
      where: { id }
    })
    
    return coupon;
  }

  async validate(data: IValidateCouponDTO): Promise<ICouponValidateResponse | Error> {
    const { code, cart_total, userId } = data;
    const currentDate = new Date();

    if (!code) {
      throw new BadRequestException('Code required.')
    }

    const coupon = await this.prisma.coupon.findUnique({
      where: { 
        code: code.toUpperCase() 
      }
    })

    if (!coupon || !coupon.active) {
      throw new NotFoundException('Coupon does not exist.')
    }

    if (new Date(coupon.expires_at) < currentDate) {
      throw new NotFoundException('Coupon expired.')
    }

    if ( cart_total < coupon.minValue) {
      throw new NotFoundException(`Minimum order value is ${coupon.minValue}`)
    }

     //* global usage check *//
     if (coupon.usage_limit) {
      const usages = await this.prisma.couponUsage.aggregate({
        where: { couponId: coupon.id },
        _sum: { count: true },
      });

      const totalUsages = usages._sum.count ?? 0;
      if (totalUsages >= coupon.usage_limit) {
        throw new NotFoundException(`Coupon usage limit reached`)
      }
    }

     //* perUser check *//
    if (coupon.perUser_limit && userId) {
      const usage = await this.prisma.couponUsage.findUnique({
        where: { couponId_userId: { couponId: coupon.id, userId } }
      }).catch(() => null);
      if (usage && usage.count >= coupon.perUser_limit) {
        throw new NotFoundException(`You have reached usage limit for this coupon`)
      }
    }
    
    return {
      valid: true,
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      message: "Coupon valid",
    }
  }
}
