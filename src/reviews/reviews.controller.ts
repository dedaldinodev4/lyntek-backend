import { Controller, Get, Post, Body, Put, Param, Delete, Version } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateReviewDto) {
    return this.reviewsService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateReviewDto) {
    return this.reviewsService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.reviewsService.delete(id);
  }
}
