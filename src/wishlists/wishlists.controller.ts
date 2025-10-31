import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Put } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @Version('1')
  create(@Body() data: CreateWishlistDto) {
    return this.wishlistsService.create(data);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne(id);
  }

  @Get('byUser/:userId')
  @Version('1')
  findByUser(@Param('userId') userId: string) {
    return this.wishlistsService.findByUser(userId);
  }

  @Put(':id')
  @Version('1')
  update(@Param('id') id: string, @Body() data: UpdateWishlistDto) {
    return this.wishlistsService.update(id, data);
  }

  @Delete(':id')
  @Version('1')
  delete(@Param('id') id: string) {
    return this.wishlistsService.delete(id);
  }
}
