export class ProductVariant {
  id: string;
  sku: string;
  title: string;
  price: number;
  stock: number;
  currency: string;
  discountPercent: number;
  offerExpires_at: Date | null;
  productId: string;
  created_at: Date;
  updated_at: Date;
}
