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
import {ConfigModule} from '@nestjs/config'
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { AuthModule } from './auth/auth.module';
import { AppMailerModule } from './mailer/mailer.module';
import { UserSeeder } from './database/seeds/user.seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }), 
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
    CategoryModule, ProductModule, 
    ProductImageModule, ShippingAddressModule, 
    OrderModule, PaymentModule, ShipmentModule, 
    OrderDetailModule, ReviewModule, WishListModule, 
    ProductCategoryModule, ProductKeywordModule, UserModule, ShoppingCartModule, AuthModule, AppMailerModule
   ],
  controllers: [AppController],
  providers: [AppService, UserSeeder], // Se agrega el UserSeeder como provider
  exports: [UserSeeder],
})
export class AppModule {}
