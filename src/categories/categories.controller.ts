import { 
  Controller, Get, Post, Body, Param, Delete, Version, 
  Put, UseGuards, UseInterceptors, UploadedFile,
  Res
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

@Controller('categories')
@UseGuards(RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Version('1')
  @Roles('admin')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Version('1')
  @Roles('admin')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Version('1')
  @Roles('admin', 'customer')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  @Roles('admin')
  update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    return this.categoriesService.update(id, data);
  }

  @Post(':id/upload')
  @Version('1')
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/uploads/categories',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadCover(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.categoriesService.uploadCover(id, file)
  }

  @Delete(':id')
  @Version('1')
  @Roles('admin')
  delete(@Param('id') id: string ) {
    return this.categoriesService.delete(id);
  }

  @Get('/images/:filename')
  @Version('1')
  @Roles('admin')
  getCover(@Param('filename') filename: string, @Res() response: Response ) {
    const imagePath = join(process.cwd(), 'public', 'uploads', 'categories', filename)
    return createReadStream(imagePath).pipe(response)
  }

}
