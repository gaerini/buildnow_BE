import { IsString } from "class-validator";

export class NewApplication {
    @IsString()
    isNew: boolean;
    @IsString()
    isRecomended: boolean;
}