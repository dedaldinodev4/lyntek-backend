import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Put } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import type { ShipmentStatus } from '@prisma/client';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateShipmentDto) {
    return this.shipmentsService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.shipmentsService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.shipmentsService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateShipmentDto) {
    return this.shipmentsService.update(id, data);
  }

  @Put(':id/changeStatus/:status')
  @Version('1')
  setStatus(@Param('id') id: string, @Param('status') status: ShipmentStatus) {
    return this.shipmentsService.setStatus(id, status);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.shipmentsService.delete(id);
  }
}
