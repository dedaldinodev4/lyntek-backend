import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Put } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateAddressDto) {
    return this.addressesService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateAddressDto) {
    return this.addressesService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.addressesService.delete(id);
  }
}
