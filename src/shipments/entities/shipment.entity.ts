import type { ShipmentStatus } from "@prisma/client";

export class Shipment {
  id: string;
  orderId: string;
  trackingId: string | null;
  carrierId: string | null;
  status: ShipmentStatus;
  estimatedDelivery: Date | null;
  shipped_at: Date | null;
  delivered_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
