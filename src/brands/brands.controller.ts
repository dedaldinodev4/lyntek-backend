import {
  Controller, Get, Post, Body,
  UseInterceptors, UploadedFile
  , Param, Delete, Version, Put,
  Res
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import type { Response } from 'express';




@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }

  @Post()
  @Version('1')
  create(@Body() data: CreateBrandDto) {
    return this.brandsService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateBrandDto) {
    return this.brandsService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.brandsService.delete(id);
  }


  @Post(':id/upload')
  @Version('1')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/uploads/brands',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadCover(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.brandsService.uploadCover(id, file)
  }

  @Get('/images/:filename')
  @Version('1')
  getCover(@Param('filename') filename: string, @Res() response: Response) {
    const imagePath = join(process.cwd(), 'public', 'uploads', 'brands', filename)
    return createReadStream(imagePath).pipe(response)
  }


}
