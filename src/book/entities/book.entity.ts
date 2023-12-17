import { Status } from 'src/helpers/constants';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column()
  cover: string;

  @Column({ default: Status.AVAILABLE, enum: Status, type: 'enum' })
  status: Status;

  @ManyToOne(() => User, (user) => user.books, {
    nullable: true,
    cascade: true,
  })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.requestedBooks, {
    nullable: true,
  })
  requestedBy: User;

  @ManyToOne(() => User, (user) => user.approvedBooks, {
    nullable: true,
  })
  approvedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
