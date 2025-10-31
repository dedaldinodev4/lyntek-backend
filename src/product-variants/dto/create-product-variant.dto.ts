export class CreateProductVariantDto {
  sku: string;
  title: string;
  price: number;
  stock: number;
  currency: string;
  discountPercent: number;
  offerExpires_at?: Date;
  productId: string;
}
