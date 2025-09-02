
export class CreatePaymentDto {
  orderId: string;
  methodId: string;
  providerId: string;
  amount: number;
  currency: string;
}
