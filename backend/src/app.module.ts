import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ShipmentModule } from './shipment/shipment.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { ReviewModule } from './review/review.module';
import { WishListModule } from './wish-list/wish-list.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductKeywordModule } from './product-keyword/product-keyword.module';

@Module({
  imports: [CategoryModule, ProductModule, ProductImageModule, ShippingAddressModule, OrderModule, PaymentModule, ShipmentModule, OrderDetailModule, ReviewModule, WishListModule, ProductCategoryModule, ProductKeywordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
