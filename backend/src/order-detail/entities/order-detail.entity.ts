import { isNumber } from 'class-validator';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('orderdetail')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  orderdetailid: string;

  @Column({ type: 'uuid' })
  orderid: string;

  @Column({ type: 'uuid' })
  productid: string;

  @Column({ type: 'int' })
  quantity: number;


  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedat?: Date;

}
