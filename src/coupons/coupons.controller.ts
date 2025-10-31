import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Put } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import type { IValidateCouponDTO } from './dto/validate-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateCouponDto) {
    return this.couponsService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateCouponDto) {
    return this.couponsService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.couponsService.delete(id);
  }

  @Put('/desactivate:id')
  @Version('1')
  desactivate(@Param('id') id: string) {
    return this.couponsService.desactivate(id);
  }

  @Get(':id/validate')
  @Version('1')
  validate(@Body() data: IValidateCouponDTO) {
    return this.couponsService.validate(data);
  }
}
