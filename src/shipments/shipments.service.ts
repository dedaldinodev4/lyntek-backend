import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { OrdersService } from 'src/orders/orders.service';
import { Shipment } from './entities/shipment.entity';
import { ShipmentStatus } from '@prisma/client';
import { CarrierService } from 'src/carrier/carrier.service';


@Injectable()
export class ShipmentsService {
  constructor(
    private prisma: PrismaService,
    private ordersService: OrdersService,
    private carriersService: CarrierService
  ) { }

  async create(data: CreateShipmentDto): Promise<Shipment | Error> {
    const { orderId, carrierId } = data;
    const order = await this.ordersService.findOne(orderId)
    if (!order) {
      throw new NotFoundException('Order does not exist.')
    }
    if (carrierId && await this.findByCarrier(carrierId)) {
      throw new NotFoundException('Carrier does not exist.')
    }
    
    const shipment = await this.prisma.shipment.create({
      data
    })
    return shipment;
  }

  async findAll(): Promise<Shipment[]> {
    const shipments = await this.prisma.shipment.findMany({})
    return shipments;
  }

  async findOne(id: string): Promise<Shipment | Error> {
    const shipment = await this.prisma.shipment.findFirst({
      where: { id }
    })

    if (!shipment) {
      throw new NotFoundException('Shipment does not exist.');
    }
    return shipment;
  }

  async findByCarrier(carrierId: string): Promise<Shipment | null> {
    const shipment = await this.prisma.shipment.findFirst({
      where: { carrierId }
    })

    return shipment;
  }

  async update(id: string, data: UpdateShipmentDto): Promise<Shipment | Error> {
    const shipment = await this.prisma.shipment.findFirst({
      where: { id }
    })

    if (!shipment) {
      throw new NotFoundException('Shipment does not exist.');
    }

    const updateShipment = await this.prisma.shipment.update({
      data,
      where: { id }
    })
    return updateShipment;
  }

  async setStatus(id: string, status: ShipmentStatus): Promise<Shipment | Error> {
    const shipment = await this.prisma.shipment.findFirst({
      where: { id }
    })

    if (!shipment) {
      throw new NotFoundException('Shipment does not exist.');
    }

    const updateShipment = await this.prisma.shipment.update({
      data: { status },
      where: { id }
    })
    return updateShipment;
  }

  async delete(id: string): Promise<void> {
    const shipment = await this.prisma.shipment.findFirst({
      where: { id }
    })

    if (!shipment) {
      throw new NotFoundException('Shipment does not exist.');
    }

    const deleteShipment = await this.prisma.shipment.delete({
      where: { id }
    })
  }
}
