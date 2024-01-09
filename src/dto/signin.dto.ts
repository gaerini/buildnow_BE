import { IsString } from "class-validator";

export class SignInDto {
    @IsString()
    businessId: string;

    @IsString()
    password: string;
}