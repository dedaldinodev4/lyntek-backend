import type {  
  PaymentStatus 
} from "@prisma/client";

export class Payment {
  id: string;
  orderId: string;
  methodId: string;
  providerId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  created_at: Date;
  updated_at: Date;
}
