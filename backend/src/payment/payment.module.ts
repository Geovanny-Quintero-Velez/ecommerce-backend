import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Order } from '../order/entities/order.entity';
import { User } from '../user/entities/user.entity';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';
import { AppMailerModule } from '../mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, User]),
    OrderModule,
    UserModule,
    AppMailerModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule { }
