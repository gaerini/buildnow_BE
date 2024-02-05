import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class InsertGradingDto {
  @IsString()
  upperCategory: string;
  @IsString()
  category: string;
  @Transform(({ value }) => parseInt(value, 10))
  perfectScore: number;
  @Transform(({ value }) => parseInt(value, 10))
  threshold: number;
}
