import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Recruiter } from "./recruiter.entity";

export const GetRecruiter = createParamDecorator((data, ctx: ExecutionContext): Recruiter => {
    const req = ctx.switchToHttp().getRequest();
    return req.recruiter;
})