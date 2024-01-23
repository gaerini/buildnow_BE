import { IsString } from "class-validator";

export class UpdateScoreDto {
    @IsString()
    id: string;

    @IsString()
    newScore: string;
}