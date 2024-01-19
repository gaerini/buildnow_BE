import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApplierGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    if(user && user.userType === 'applier'){
      return true;
    } else {
      throw new UnauthorizedException("Recruiter Can't Access This EndPoint");
    }
  }
}
