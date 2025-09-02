import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Put } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import type { PaymentStatus } from '@prisma/client';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreatePaymentDto) {
    return this.paymentsService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdatePaymentDto) {
    return this.paymentsService.update(id, data);
  }

  @Put(':id/changeStatus/:status')
  @Version('1')
  setStatus(@Param('id') id: string, @Param('status') status: PaymentStatus) {
    return this.paymentsService.setStatus(id, status);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.paymentsService.delete(id);
  }
}
