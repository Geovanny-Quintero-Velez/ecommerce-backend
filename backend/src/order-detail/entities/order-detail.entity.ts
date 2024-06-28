import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Big from 'big.js';

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

  setPrice(value: number | string) {
    this.price = new Big(value).toString();
  }

  getPrice(): Big {
    return new Big(this.price);
  }

  add(value: number | string): void {
    const price = this.getPrice();
    this.price = price.plus(new Big(value)).toString();
  }

  subtract(value: number | string): void {
    const price = this.getPrice();
    this.price = price.minus(new Big(value)).toString();
  }

  multiply(value: number | string): void {
    const price = this.getPrice();
    this.price = price.times(new Big(value)).toString();
  }

  divide(value: number | string): void {
    const price = this.getPrice();
    this.price = price.div(new Big(value)).toString();
  }

}
