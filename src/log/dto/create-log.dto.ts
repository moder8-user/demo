import { IsArray, IsNumber } from 'class-validator';

export class CreateLogDto {
  @IsArray()
  books: number[];

  @IsNumber()
  requestedBy: number;
}
