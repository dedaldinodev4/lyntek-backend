
export class UpdateCouponDto {
  code: string;
  type: string;
  value: number;
  minValue: number;
  expires_at: Date;
  usage_limit?: number;
  perUser_limit?: number
  description?: string;
  active: boolean;
}
