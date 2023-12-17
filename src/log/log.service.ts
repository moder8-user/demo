import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, In } from 'typeorm';
import { Role, Status } from 'src/helpers/constants';
import { UpdateBookDto } from 'src/book/dto/update-book.dto';

@Injectable()
export class LogService {
  constructor(private dataSource: DataSource) {}

  get bookRepo() {
    return this.dataSource.getRepository(Book);
  }

  get userRepo() {
    return this.dataSource.getRepository(User);
  }

  returnBasicUser(user: User) {
    delete user.password;
    return user;
  }

  async create(createLogDto: CreateLogDto) {
    const { books, requestedBy } = createLogDto;

    const bookCount = await this.bookRepo.find({
      where: { id: In(books), status: Status.AVAILABLE },
    });

    if (bookCount.length < 1) {
      throw new HttpException('No books are available', HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepo.findOne({
      where: { id: requestedBy },
    });

    const logs = await this.bookRepo.update(
      {
        id: In(bookCount.map((book) => book.id)),
      },
      {
        status: Status.PENDING,
        requestedBy: user,
      },
    );
    return logs;
  }

  findAll(partialBookDto: UpdateBookDto) {
    return this.bookRepo.find({
      where: {
        status: partialBookDto.status,
      },
      withDeleted: false,
    });
  }

  findOne(id: number) {
    return this.bookRepo.findOne({
      where: { id },
    });
  }

  async update(id: number, updateLogDto: UpdateLogDto) {
    let result = {
      approvedBy: null,
    };
    if (updateLogDto.approvedBy) {
      const user = await this.userRepo.findOne({
        where: { id: updateLogDto.approvedBy },
      });
      if (user.role === Role.MEMBER) {
        return new HttpException(
          'Only admins or managers are allowed to approve a book',
          HttpStatus.FORBIDDEN,
        );
      }
      result = {
        approvedBy: user,
      };
    }
    return this.bookRepo.update(id, {
      ...result,
      status: Status.BORROWED,
    });
  }

  remove(id: number) {
    return this.bookRepo.softDelete(id);
  }
}
