import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Enterprise } from './enterprise.entity';
import { Stall } from './stall.entity';

@Entity()
export class Registration {
    @PrimaryGeneratedColumn("uuid")
    registration_id: string;

    @Column()
    priorityNumber: number

    @ManyToOne(() => Enterprise)
    @JoinTable()
    enterprise: Enterprise;

    @Column()
    lock: number

    @Column()
    tick: number

    @ManyToOne(() => Stall)
    @JoinTable()
    stall: Stall;
  
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}