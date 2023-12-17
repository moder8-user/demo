import { PartialType } from '@nestjs/mapped-types';
import { CreateLogDto } from './create-log.dto';
import { IsNumber } from 'class-validator';

export class UpdateLogDto extends PartialType(CreateLogDto) {
  @IsNumber()
  approvedBy: number;
}
