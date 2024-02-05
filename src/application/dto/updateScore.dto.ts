import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateScoreDto {
  @Transform(({ value }) => parseInt(value, 10))
  id: number;

  @Transform(({ value }) => parseInt(value, 10))
  newScore: number;
}
