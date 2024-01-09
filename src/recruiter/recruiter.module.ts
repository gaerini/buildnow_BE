import { Module } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from 'src/entities/recruiter.entity';
import { RecruiterController } from './recruiter.controller';
import { Recruitment } from 'src/entities/recruitment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recruiter, Recruitment])],
  providers: [RecruiterService],
  controllers: [RecruiterController],
})
export class RecruiterModule {}
