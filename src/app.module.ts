import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma/prisma.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { MailService } from './shared/mail/mail.service';
import { MailModule } from './shared/mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { ProductsModule } from './products/products.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { AddressesModule } from './addresses/addresses.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { BrandsModule } from './brands/brands.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { PaymentProvidersModule } from './payment-providers/payment-providers.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { CarrierModule } from './carrier/carrier.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { CouponsModule } from './coupons/coupons.module';
import { CouponUsagesModule } from './coupon-usages/coupon-usages.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { WishlistItemsModule } from './wishlist-items/wishlist-items.module';


@Module({
  imports: [
    ConfigModule, MailModule, AuthModule, 
    UsersModule, CartsModule, CategoriesModule, 
    CartItemsModule, ProductsModule, ProductImagesModule, 
    AddressesModule, OrdersModule, PaymentsModule, ShipmentsModule, 
    ReviewsModule, OrderItemsModule, BrandsModule, ProductVariantsModule, 
    PaymentProvidersModule, PaymentMethodsModule, CarrierModule, ProductDetailsModule, CouponsModule, CouponUsagesModule, WishlistsModule, WishlistItemsModule
  ],
  controllers: [AppController],
  providers: [
    AppService, PrismaService, ConfigService, MailService, JwtService
    /* { 
      provide: APP_GUARD, 
      useClass: RolesGuard 
    } */
  ],
})
export class AppModule {}
