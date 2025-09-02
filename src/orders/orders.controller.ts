import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateOrderDto) {
    return this.ordersService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    return this.ordersService.update(id, data);
  }
  
    @Put(':id/chageStatus/:status')
    @Version('1')
    setStatus(@Param('id') id: string, @Param('status') status: string) {
      return this.setStatus(id, status);
    }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }

}
