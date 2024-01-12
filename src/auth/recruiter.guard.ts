import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RecruiterGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    if(user && user.userType === 'recruiter'){
      return true;
    } else{
      throw new UnauthorizedException("Applier Can't Access This EndPoint");
    }
  }
}
