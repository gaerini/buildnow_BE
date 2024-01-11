import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from './auth/recruiter.entity';
import { Recruitment } from './entities/recruitment.entity';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { RecruiterService } from './auth/recruiter.service';
import { RecruitmentModule } from './recruitment/recruitment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ji-hokim',
      password: '',
      database: 'buildnow_test',
      entities: [__dirname + '/**/*.entity.{js, ts}'],
      synchronize: true,
    }),
    AuthModule,
    RecruitmentModule,

  
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
