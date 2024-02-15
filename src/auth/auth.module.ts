import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from './recruiter/recruiter.entity';
import { Recruitment } from 'src/entities/recruitment.entity';
import { RecruiterService } from './recruiter/recruiter.service';
import { JwtModule } from '@nestjs/jwt';
import { Constant } from '../../auth.constant';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Applier } from './applier/applier.entity';
import { ApplierService } from './applier/applier.service';
import { LocalStrategy } from './strategy/local.strategy';
import { RefreshStrategy } from './strategy/refresh.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recruiter, Recruitment, Applier]),
    JwtModule.register({
      secret: Constant.secret,
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RecruiterService,
    ApplierService,
    JwtStrategy,
    LocalStrategy,
    RefreshStrategy,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    LocalStrategy,
    RefreshStrategy,
    JwtModule,
  ], //다른 모듈에서도 사용해야하므로 추출해야함
})
export class AuthModule {}
