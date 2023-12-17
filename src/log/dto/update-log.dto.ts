import { PartialType } from '@nestjs/mapped-types';
import { CreateLogDto } from './create-log.dto';
import { IsArray } from 'class-validator';

export class UpdateLogDto extends PartialType(CreateLogDto) {
  @IsArray()
  approvedBy: number[];
}
