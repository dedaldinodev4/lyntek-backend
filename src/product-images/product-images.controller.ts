import {
  Controller,
  Get, Post, Body, Param, Delete, Version,
  Put, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('products_images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) { }

  @Post(':productId/upload')
  @Version('1')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/uploads/products',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  create(@Param('productId') productId : string, @UploadedFile() file: Express.Multer.File) {
    return this.productImagesService.create(productId, file);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.productImagesService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.productImagesService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateProductImageDto) {
    return this.productImagesService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.productImagesService.delete(id);
  }
}
