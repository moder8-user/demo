import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/helpers/constants';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  description: string;

  @IsString()
  cover: string;

  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsNumber()
  createdBy: number;
}
