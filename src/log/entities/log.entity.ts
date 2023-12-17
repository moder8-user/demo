import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Book, (book) => book.logs, { nullable: true })
  books: Book[];

  @OneToMany(() => User, (user) => user.requestedBooks, { nullable: true })
  requestedBy: User[];

  @OneToMany(() => User, (user) => user.approvedBooks, { nullable: true })
  approvedBy: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
