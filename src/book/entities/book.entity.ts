import { Status } from 'src/helpers/constants';
import { Log } from 'src/log/entities/log.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
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

  @ManyToOne(() => User, (user) => user.books, { nullable: true })
  createdBy: User;

  @ManyToMany(() => Log, (log) => log.books, { nullable: true })
  logs: Log[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
