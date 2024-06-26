import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Big from 'big.js';

@Entity('Order')
export class Order {
    
  @PrimaryGeneratedColumn('uuid')
  orderid: string;

  @Column({ type: 'uuid' })
  userid: string;

  @Column({ type: 'uuid' })
  addressid: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status?: string;

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
