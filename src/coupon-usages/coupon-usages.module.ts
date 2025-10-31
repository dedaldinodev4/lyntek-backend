import { Module } from '@nestjs/common';
import { CouponUsagesService } from './coupon-usages.service';
import { CouponUsagesController } from './coupon-usages.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CouponsService } from 'src/coupons/coupons.service';

@Module({
  controllers: [CouponUsagesController],
  providers: [
    CouponUsagesService,
    PrismaService,
    UsersService,
    CouponsService
  ],
})
export class CouponUsagesModule {}
