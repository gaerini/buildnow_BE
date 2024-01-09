import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruiterModule } from './recruiter/recruiter.module';
import { Recruiter } from './entities/recruiter.entity';
import { Recruitment } from './entities/recruitment.entity';
import { AuthModule } from './auth/auth.module';

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
    RecruiterModule,
    AuthModule,
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
