import { Controller, Get, Post, Body, Put, Version, Param, Delete } from '@nestjs/common';
import { CouponUsagesService } from './coupon-usages.service';
import { CreateCouponUsageDto } from './dto/create-coupon-usage.dto';
import { UpdateCouponUsageDto } from './dto/update-coupon-usage.dto';

@Controller('coupon-usages')
export class CouponUsagesController {
  constructor(private readonly couponUsagesService: CouponUsagesService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateCouponUsageDto) {
    return this.couponUsagesService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.couponUsagesService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.couponUsagesService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateCouponUsageDto) {
    return this.couponUsagesService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.couponUsagesService.delete(id);
  }
}
