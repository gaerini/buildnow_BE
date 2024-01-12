import { IsString } from 'class-validator';

export class CreateRecruitmentDto {
  @IsString()
  deadline: string;

  @IsString()
  workType: string;

  @IsString()
  requirements: string;

  @IsString()
  applyingFormat: string;
}
