import { IsString } from "class-validator";

export class SignUpRecruiterDto{
    @IsString()
    readonly businessId: string;
    @IsString()
    readonly password: string;
    @IsString()
    readonly managerName: string;
    @IsString()
    readonly companyName: string;
}