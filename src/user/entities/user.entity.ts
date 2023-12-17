import { Book } from 'src/book/entities/book.entity';
import { Role } from 'src/helpers/constants';
import { Log } from 'src/log/entities/log.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
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

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: Role.MEMBER, enum: Role, type: 'enum' })
  role: Role;

  @OneToMany(() => Book, (book) => book.createdBy, { nullable: true })
  books: Book[];

  @ManyToOne(() => Log, (log) => log.requestedBy, { nullable: true })
  requestedBooks: Log[];

  @ManyToOne(() => Log, (log) => log.approvedBy, { nullable: true })
  approvedBooks: Log[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
