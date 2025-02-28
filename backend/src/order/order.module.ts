import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { OrderDetail } from '../order-detail/entities/order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]),OrderDetailModule,TypeOrmModule.forFeature([OrderDetail])],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule {}
