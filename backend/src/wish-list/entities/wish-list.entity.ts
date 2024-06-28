import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
@Entity('wishlist')
export class WishList {
    @PrimaryGeneratedColumn('uuid')
    wishlistid: string;
  
    @Column({ type: 'uuid' })
    userid: string;
  
    @Column({ type: 'uuid' })
    productid: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdat: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedat?: Date;
}
