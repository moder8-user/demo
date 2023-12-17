import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, In } from 'typeorm';
import { Log } from './entities/log.entity';
import { Status } from 'src/helpers/constants';

@Injectable()
export class LogService {
  constructor(private dataSource: DataSource) {}

  get bookRepo() {
    return this.dataSource.getRepository(Book);
  }

  get userRepo() {
    return this.dataSource.getRepository(User);
  }

  get logRepo() {
    return this.dataSource.getRepository(Log);
  }

  returnBasicUser(user: User) {
    delete user.password;
    return user;
  }

  async create(createLogDto: CreateLogDto) {
    const bookCount = await this.bookRepo.count({
      where: { id: In(createLogDto.books), status: Status.AVAILABLE },
    });

    if (bookCount < 1) {
      throw new HttpException('No books are available', HttpStatus.NOT_FOUND);
    }

    const { books, requestedBy } = createLogDto;
    const users = await this.userRepo.find({
      where: { id: In(requestedBy) },
    });
    const allBooks = await this.bookRepo.find({ where: { id: In(books) } });

    const log = await this.logRepo.save({
      books: allBooks,
      requestedBy: users,
    });
    return log;
  }

  findAll() {
    return `This action returns all log`;
  }

  findOne(id: number) {
    return `This action returns a #${id} log`;
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}
