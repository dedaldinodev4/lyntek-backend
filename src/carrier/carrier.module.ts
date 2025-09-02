import { Module } from '@nestjs/common';
import { CarrierService } from './carrier.service';
import { CarrierController } from './carrier.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  controllers: [CarrierController],
  providers: [CarrierService, PrismaService],
})
export class CarrierModule {}
