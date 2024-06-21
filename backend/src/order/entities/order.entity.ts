import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('Order')
export class Order {
    
  @PrimaryGeneratedColumn('uuid')
  orderid: string;

  @Column({ type: 'uuid' })
  userid: string;

  @Column({ type: 'uuid' })
  addressid: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedat?: Date;

}
