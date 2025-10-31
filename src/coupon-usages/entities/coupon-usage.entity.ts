export class CouponUsage {
  id: string;
  couponId: string;
  userId: string;
  count: number;
  last_used: Date;
}

export type CouponUsageTotal = {
  total: number;
  usages: CouponUsage[] | null;
}
