import { IsBoolean, IsString } from "class-validator";

export class NewApplicationDto {
    @IsString()
    isNew: string;
    @IsString()
    isRecommended: string;
}