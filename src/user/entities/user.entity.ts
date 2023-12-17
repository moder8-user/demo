import { Book } from 'src/book/entities/book.entity';
import { Role } from 'src/helpers/constants';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: Role.MEMBER, enum: Role, type: 'enum' })
  role: Role;

  @OneToMany(() => Book, (book) => book.createdBy, { nullable: true })
  books: Book[];

  @OneToMany(() => Book, (book) => book.requestedBy, { nullable: true })
  requestedBooks: Book;

  @OneToMany(() => Book, (book) => book.approvedBy, { nullable: true })
  approvedBooks: Book;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
