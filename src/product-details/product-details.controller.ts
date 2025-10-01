import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductDetailsService } from './product-details.service';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';

@Controller('products_details')
export class ProductDetailsController {
  constructor(private readonly productDetailsService: ProductDetailsService) {}

  @Post()
  create(@Body() data: CreateProductDetailDto) {
    return this.productDetailsService.create(data);
  }

  @Get()
  findAll() {
    return this.productDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDetailsService.findOne(id);
  }

  @Get('byProduct/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.productDetailsService.findByProduct(productId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDetailDto) {
    return this.productDetailsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productDetailsService.delete(id);
  }
}
