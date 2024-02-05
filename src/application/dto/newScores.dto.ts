import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class NewScores {
  @IsString()
  upperCategory: string;

  @IsString()
  category: string;

  @Transform(({ value }) => parseInt(value, 10))
  score: number;
}
