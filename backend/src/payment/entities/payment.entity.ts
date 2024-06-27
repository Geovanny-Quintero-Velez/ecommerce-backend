import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
  paymentid: string;

  @Column({ type: 'uuid' })
  orderid: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'varchar', length: 100 })
  paymentmethod: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  transactionid?: string;

  @Column({ type: 'text', nullable: true })
  errormessage?: string;

  @Column({ type: 'jsonb', nullable: true })
  apiresponse?: object;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedat?: Date;
}
