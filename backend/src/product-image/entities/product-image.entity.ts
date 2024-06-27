import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
@Entity('productimage')
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  imageid: string;

  @Column({ type: 'uuid' })
  productid: string;

  @Column({ type: 'text' })
  img: string;

  @Column({ type: 'int' })
  position: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedat?: Date;

}
