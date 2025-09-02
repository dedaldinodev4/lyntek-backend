import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AddressesController],
  providers: [
    AddressesService, 
    PrismaService, 
    UsersService
  ],
})
export class AddressesModule {}
