import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('product')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    productid: string;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description?: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
  
    @Column({ type: 'int' })
    stock: number;
    
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    discount?: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdat: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedat?: Date;
  
    @Column({ type: 'uuid', nullable: true })
    lastmodifiedby?: string;
  
    @Column({ type: 'timestamp', nullable: true })
    lastmodifiedat?: Date;
  
}
