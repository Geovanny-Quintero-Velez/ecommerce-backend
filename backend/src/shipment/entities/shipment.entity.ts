import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('shipment')
export class Shipment {
    @PrimaryGeneratedColumn('uuid')
  shipmentid: string;

  @Column({ type: 'uuid' })
  orderid: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  carrier?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  trackingnumber?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status?: string;

  @Column({ type: 'timestamp', nullable: true })
  shippedat?: Date;

  @Column({ type: 'timestamp', nullable: true })
  expecteddeliveryat?: Date;

  @Column({ type: 'timestamp', nullable: true })
  deliveredat?: Date;

  @Column({ type: 'jsonb', nullable: true })
  apiresponse?: any;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedat?: Date;

}
