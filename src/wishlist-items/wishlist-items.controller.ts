import { Controller, Get, Post, Put, Version, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishlistItemsService } from './wishlist-items.service';
import { CreateWishlistItemDto } from './dto/create-wishlist-item.dto';
import { UpdateWishlistItemDto } from './dto/update-wishlist-item.dto';

@Controller('wishlist-items')
export class WishlistItemsController {
  constructor(private readonly wishlistItemsService: WishlistItemsService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateWishlistItemDto) {
    return this.wishlistItemsService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.wishlistItemsService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.wishlistItemsService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateWishlistItemDto) {
    return this.wishlistItemsService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.wishlistItemsService.delete(id);
  }
}
