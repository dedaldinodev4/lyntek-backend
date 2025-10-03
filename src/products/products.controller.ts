import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Put, Query, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { ProductQueryDto } from './dto/query-product.dto';
import { PaginationInterceptor } from 'src/common/interceptors/pagination/pagination.interceptor';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @Get()
  @Version('1')
  @UseInterceptors(PaginationInterceptor)
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
