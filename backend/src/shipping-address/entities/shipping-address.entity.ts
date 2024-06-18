import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('shippingaddress')
export class ShippingAddress {

    @PrimaryGeneratedColumn('uuid')
    addressid: string;
  
    @Column({ type: 'varchar', length: 100 })
    country: string;
  
    @Column({ type: 'varchar', length: 100 })
    city: string;
  
    @Column({ type: 'varchar', length: 20 })
    zipcode: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdat: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedat?: Date;
}
