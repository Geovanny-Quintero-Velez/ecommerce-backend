
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  reviewid: string;

  @Column({ type: 'uuid' })
  userid: string;

  @Column({ type: 'uuid' })
  productid: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 1 })
  rate: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedat?: Date;
}
