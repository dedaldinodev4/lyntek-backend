import type { OrderStatus } from "@prisma/client";

export class Order {
  id: string;
  userId: string;
  addressId: string;
  total: number;
  couponCode: string | null;
  discountType: string | null;
  discountValue: number | null;
  discountAmount: number | null;
  finalTotal: number | null;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
}
