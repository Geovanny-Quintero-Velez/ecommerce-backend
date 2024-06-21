import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Role } from '../role/role.enum';

@Entity('User')
export class User {

  @PrimaryGeneratedColumn('uuid')
  userid: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  lastname: string;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  role?: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  username?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdat: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedat?: Date;
}
