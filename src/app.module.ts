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
import * as config from 'config';

const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.type,
      host: process.env.RDS_HOSTNAME || dbConfig.host,
      port: process.env.RDS_PORT || dbConfig.port,
      username: process.env.POSTGRES_USER || dbConfig.username,
      password: process.env.POSTGRES_PASSWORD || dbConfig.password,
      database: process.env.POSTGRES_DB || dbConfig.database,
      entities: [__dirname + '/**/*.entity.{js, ts}'],
      synchronize: dbConfig.synchronize,
    }),
    AuthModule,
    RecruitmentModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [ApplierService, ApplicationService],
})
export class AppModule {}
