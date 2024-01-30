import { IsArray, IsString } from 'class-validator';

export class CreateRecruitmentDto {
  @IsString()
  deadline: string;

  @IsString()
  workType: string;

  @IsArray()
  requirements: string[];
}
