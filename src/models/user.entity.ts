import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from "src/constants/user.constant";
import { UserStatus } from './../constants/user.constant';
@Entity()
export class User {
  @PrimaryColumn()
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

	@Column({ default: UserStatus.UNINITIALZED })
	init: number;

	@Column({ default: UserRole.ENTERPRISE })
	role: number;

}
