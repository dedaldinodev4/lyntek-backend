export class Coupon {
  id: string;
  code: string;
  type: string;
  value: number;
  minValue: number;
  expires_at: Date;
  usage_limit: number | null;
  perUser_limit: number | null;
  active: boolean;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}
