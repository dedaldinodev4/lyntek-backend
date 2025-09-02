import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CartsController],
  providers: [
    CartsService, 
    PrismaService, 
    UsersService
  ],
  exports: [CartsService]

})
export class CartsModule {}
