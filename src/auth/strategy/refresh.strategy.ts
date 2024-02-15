import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Recruiter } from '../recruiter/recruiter.entity';
import { Constant } from 'auth.constant';

export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly authService: AuthService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const requestShow = request;
          return request.cookies.refreshToken;
        },
      ]),
      secretOrKey: Constant.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  async validate(request: Request, payload: any) {
    const refreshToken = request.cookies['refreshToken'];
    const { businessId, userType } = payload;
    const recruiter = await this.dataSource.manager.findOne(Recruiter, {
      where: { businessId: businessId },
    });
    return this.authService.refreshTokenMatches(refreshToken, recruiter);
  }
}
