import { IsEnum, IsString } from 'class-validator';
import { Role } from 'src/helpers/constants';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
