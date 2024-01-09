import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RecruiterModule } from 'src/recruiter/recruiter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from 'src/entities/recruiter.entity';
import { RecruiterService } from 'src/recruiter/recruiter.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';

@Module({
  imports:[TypeOrmModule.forFeature([Recruiter]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '3600s'},
  }),],
  controllers: [AuthController],
  providers: [AuthService, RecruiterService]
})
export class AuthModule {}
