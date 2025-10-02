import { Controller, Get, Post, Body, Param, Delete, Put, Version, Query } from '@nestjs/common';
import { ProductDetailsService } from './product-details.service';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import type { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('products_details')
export class ProductDetailsController {
  constructor(private readonly productDetailsService: ProductDetailsService) {}

  @Version('1')
  @Post()
  create(@Body() data: CreateProductDetailDto) {
    return this.productDetailsService.create(data);
  }

  @Version('1')
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.productDetailsService.findAll(pagination);
  }

  @Version('1')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDetailsService.findOne(id);
  }

  @Version('1')
  @Get('byProduct/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.productDetailsService.findByProduct(productId);
  }

  @Version('1')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDetailDto) {
    return this.productDetailsService.update(id, data);
  }

  @Version('1')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productDetailsService.delete(id);
  }
}
