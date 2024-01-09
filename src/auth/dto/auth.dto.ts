import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail()
  identifier: string;

  @IsNotEmpty()
  password: string;
}
