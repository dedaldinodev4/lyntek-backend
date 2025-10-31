import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [WishlistsController],
  providers: [
    WishlistsService, 
    PrismaService, 
    UsersService
  ],
})
export class WishlistsModule {}
