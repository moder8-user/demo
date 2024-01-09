import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/helpers/constants';
import { hashPassword } from 'src/helpers/bcrypt';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  get userRepo() {
    return this.dataSource.getRepository(User);
  }

  returnBasicUser(user: User) {
    delete user.password;
    return user;
  }

  count() {
    return this.userRepo.count();
  }

  async create(createUserDto: CreateUserDto) {
    const count = await this.count();
    const user = await this.userRepo.save({
      ...createUserDto,
      password: hashPassword(createUserDto.password),
      role: count < 1 ? Role.ADMIN : createUserDto.role,
    });
    return this.returnBasicUser(user);
  }

  findAll() {
    return this.userRepo.find({ withDeleted: false });
  }

  findOne(id: number) {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async updateRole(
    id: number,
    updateUserDto: UpdateUserDto,
    userInfo: { sub: number },
  ) {
    const user = await this.userRepo.findOne({
      where: { id: userInfo.sub },
    });
    const userToUpdate = await this.userRepo.findOne({
      where: { id },
    });

    if (!user || !userToUpdate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.role !== Role.ADMIN) {
      throw new HttpException(
        "You don't have permission to update this user",
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUser = await this.userRepo.save({
      ...userToUpdate,
      role: updateUserDto.role,
    });

    return this.returnBasicUser(updatedUser);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, {
      ...updateUserDto,
      books: updateUserDto.books.map((bookId) => ({ id: bookId })),
    });
  }

  remove(id: number) {
    return this.userRepo.softDelete(id);
  }
}
