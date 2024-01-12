import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Recruiter } from './recruiter/recruiter.entity';
import { Applier } from 'src/auth/applier/applier.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Recruiter | Applier => {
    const req = ctx.switchToHttp().getRequest();
    const { userType, ...user} = req.user;//jwt strategy에서 넣은 userType을 다시 제거해야 쿼리가 정상적으로 동작함
    return user; //default로 유저정보가 들어간 것은 user로 되어있기 때문에 이에 맞게 해야함.
  },
);
