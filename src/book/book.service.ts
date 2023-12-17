import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { Log } from 'src/log/entities/log.entity';
import { Role } from 'src/helpers/constants';

@Injectable()
export class BookService {
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

  async create(createBookDto: CreateBookDto) {
    const { createdBy, ...rest } = createBookDto;
    const user = await this.userRepo.findOne({ where: { id: createdBy } });

    if (user.role !== Role.ADMIN) {
      return new HttpException(
        'Only admins are allowed to create a book',
        HttpStatus.FORBIDDEN,
      );
    }

    const book = await this.bookRepo.save({
      ...rest,
      createdBy: user,
    });
    return {
      ...book,
      createdBy: this.returnBasicUser(user).id,
    };
  }

  findAll() {
    return this.bookRepo.find();
  }

  findOne(id: number) {
    return this.bookRepo.findOne({
      where: { id },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    let result = {
      createdBy: null,
    };
    if (updateBookDto.createdBy) {
      const user = await this.userRepo.findOne({
        where: { id: updateBookDto.createdBy },
      });
      if (user.role !== Role.ADMIN) {
        return new HttpException(
          'Only admins are allowed to update a book',
          HttpStatus.FORBIDDEN,
        );
      }
      result = {
        createdBy: {
          id: user.id,
        },
      };
    }
    return this.bookRepo.update(id, {
      ...updateBookDto,
      ...result,
    });
  }

  remove(id: number) {
    return this.bookRepo.update(id, { deletedAt: new Date() });
  }
}
