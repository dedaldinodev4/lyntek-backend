import type { OrderStatus } from "@prisma/client";

export class Order {
  id: string;
  userId: string;
  addressId: string;
  total: number;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
}
