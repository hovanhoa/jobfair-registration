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

@Entity()
export class Stall {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string

    @Column()
    Registered: number

    @Column()
    price: number

    @Column()
    width: string

    @Column()
    long: string

    @Column()
    position_x: number

    @Column()
    position_y: number
  
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}