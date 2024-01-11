import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from './recruiter.entity';
import { Recruitment } from 'src/entities/recruitment.entity';
import { RecruiterService } from './recruiter.service';
import { JwtModule } from '@nestjs/jwt';
import { Constant } from './auth.constant';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([Recruiter, Recruitment]),
JwtModule.register({
    secret: Constant.secret,
    signOptions: {
        expiresIn: '3600s',
    },
}), PassportModule.register({ defaultStrategy: 'jwt'})],
    controllers:[AuthController],
    providers: [AuthService, RecruiterService, JwtStrategy],
    exports: [JwtStrategy, PassportModule], //다른 모듈에서도 사용해야하므로 추출해야함
})
export class AuthModule {}
