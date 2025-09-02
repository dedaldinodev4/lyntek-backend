import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Put } from '@nestjs/common';
import { CarrierService } from './carrier.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';

@Controller('carrier')
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateCarrierDto) {
    return this.carrierService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.carrierService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.carrierService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateCarrierDto) {
    return this.carrierService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.carrierService.delete(id);
  }
}
