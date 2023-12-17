import { IsArray } from 'class-validator';

export class CreateLogDto {
  @IsArray()
  books: number[];

  @IsArray()
  requestedBy: number[];
}
