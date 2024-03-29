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
          console.log(requestShow);
          return request.body.refreshToken;
        },
      ]),
      secretOrKey: Constant.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  async validate(request: Request, payload: any) {
    const refreshToken = request.body.refreshToken;
    console.log(payload);
    const { businessId, userType } = payload;
    const recruiter = await this.dataSource.manager.findOne(Recruiter, {
      where: { businessId: businessId },
    });
    return this.authService.refreshTokenMatches(refreshToken, recruiter);
  }
}
