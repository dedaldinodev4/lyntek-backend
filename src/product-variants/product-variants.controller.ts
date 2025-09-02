import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Put } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Controller('products_variants')
export class ProductVariantsController {
  constructor(private readonly productVariantsService: ProductVariantsService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateProductVariantDto) {
    return this.productVariantsService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.productVariantsService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.productVariantsService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateProductVariantDto) {
    return this.productVariantsService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.productVariantsService.delete(id);
  }
}
