import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'businessId', passwordField: 'password' });
  }

  async validate(businessId: string, password: string): Promise<any> {
    console.log(password);
    const recruiter = await this.authService.validateRecruiter(
      businessId,
      password,
    );
    console.log(recruiter);
    if (!recruiter) {
      throw new UnauthorizedException(
        'Check your businessId or Password again',
      );
    }
    return recruiter;
  }
}
