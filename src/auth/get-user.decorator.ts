import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Recruiter } from "./recruiter.entity";
import { Applier } from "src/entities/applier.entity";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): Recruiter|Applier => {
    const req = ctx.switchToHttp().getRequest();
    return req.user; //default로 유저정보가 들어간 것은 user로 되어있기 때문에 이에 맞게 해야함.
})