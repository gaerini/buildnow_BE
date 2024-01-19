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
      type: process.env.DB_TYPE || dbConfig.type,
      host: process.env.DB_HOST || dbConfig.host,
      port: process.env.DB_PORT || dbConfig.port,
      username: process.env.DB_USER || dbConfig.username,
      password: process.env.DB_PWD || dbConfig.password,
      database: process.env.DB_NAME || dbConfig.database,
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
