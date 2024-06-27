import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
@Entity('productkeyword')
export class ProductKeyword {
  @PrimaryGeneratedColumn('uuid')
  productkeywordid: string;

  @Column({ type: 'uuid' })
  productid: string;

  @Column({ type: 'varchar', length: 100 })
  keyword: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedat?: Date;
}
