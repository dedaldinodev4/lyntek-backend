import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Put } from '@nestjs/common';
import { PaymentProvidersService } from './payment-providers.service';
import { CreatePaymentProviderDto } from './dto/create-payment-provider.dto';
import { UpdatePaymentProviderDto } from './dto/update-payment-provider.dto';

@Controller('payments_providers')
export class PaymentProvidersController {
  constructor(private readonly paymentProvidersService: PaymentProvidersService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreatePaymentProviderDto) {
    return this.paymentProvidersService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.paymentProvidersService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.paymentProvidersService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdatePaymentProviderDto) {
    return this.paymentProvidersService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.paymentProvidersService.delete(id);
  }
}
