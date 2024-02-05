import { IsArray } from "class-validator";
import { UpdateScoreDto } from "./updateScore.dto";

export class UpdateScoresDto {
    @IsArray()
    scores: UpdateScoreDto[];
}