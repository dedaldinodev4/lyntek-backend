export class PaymentMethod {
  id: string;
  name: string;
  code: string | null;
  providerId: string;
  created_at: Date;
  updated_at: Date;
}
