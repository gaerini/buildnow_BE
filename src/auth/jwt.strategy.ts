import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SignUpRecruiterDto } from './dto/signUp-recruiter.dto';
import { RecruiterService } from './recruiter/recruiter.service';
import { Constant } from '../../auth.constant';
import { Recruiter } from './recruiter/recruiter.entity';
import { ApplierService } from './applier/applier.service';
import { Applier } from './applier/applier.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private recruiterService: RecruiterService,
    private applierService: ApplierService,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {
    super({
      secretOrKey: Constant.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { businessId, userType } = payload;

    if (userType === 'recruiter') {
      const recruiter: Recruiter =
        await this.recruiterService.findOne(businessId);

      if (!recruiter) {
        throw new UnauthorizedException();
      }

      return { ...recruiter, userType: userType };
    } else if (userType === 'applier') {
      const applier = await this.applierService.findOne(businessId);
      if (!applier) {
        throw new UnauthorizedException();
      }

      return { ...applier, userType: userType };
    }
  }
}
