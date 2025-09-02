import { Controller, Get, Post, Body, Put, Version, Param, Delete } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Controller('order_items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateOrderItemDto) {
    return this.orderItemsService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateOrderItemDto) {
    return this.orderItemsService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.orderItemsService.delete(id);
  }
}
