import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from './auth/recruiter/recruiter.entity';
import { Recruitment } from './entities/recruitment.entity';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { RecruiterService } from './auth/recruiter/recruiter.service';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { ApplierService } from './auth/applier/applier.service';
import { ApplicationService } from './application/application.service';
import { ApplicationModule } from './application/application.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: '',
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/**/*.entity.{js, ts}'],
      synchronize: process.env.DATABASE_SYNCRONIZE === 'true',
    }),
    AuthModule,
    RecruitmentModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [ApplierService, ApplicationService],
})
export class AppModule {}
