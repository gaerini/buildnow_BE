import { IsNumber, IsString } from 'class-validator';

export class NewScores {
  @IsString()
  upperCategory: string;

  @IsString()
  category: string;

  @IsString()
  data: string;

  @IsString()
  score: number;
}
