import type { ShipmentStatus } from "@prisma/client";

export class CreateShipmentDto {
  orderId: string;
  trackingId?: string;
  carrierId?: string;
  estimatedDelivery?: Date;
  status: ShipmentStatus;
  shipped_at?: Date;
  delivered_at?: Date;
}
