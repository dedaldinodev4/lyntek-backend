export class CreateOrderDto {
  userId: string;
  addressId: string;
  total: number;
  couponCode?: string;
  discountType?: string;
  discountValue?: number;
  discountAmount?: number;
  finalTotal?: number;
}
