import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Enterprise {
    // @PrimaryGeneratedColumn()
    // id: number;
    @PrimaryColumn()
    email: string

    @Column()
    name: string

    @Column()
    initName: string

    @Column()
    lock: number

    @Column()
    address: string

    @Column()
    repFamilyName: string

    @Column()
    repGivenName: string

    @Column()
    appellation: string

    @Column()
    phoneNumber: string

    @Column()
    numberstall: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}