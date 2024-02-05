import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { DataSourceOptions } from 'typeorm';
import { Recruiter } from './auth/recruiter/recruiter.entity';
import { RecruiterSeeder } from './seeder/recruiter.seeder';
import { Recruitment } from './entities/recruitment.entity';
import { Application } from './entities/application.entity';
import { Applier } from './auth/applier/applier.entity';
import { Finance } from './entities/applier_info/finance.entity';
import { PaperReq } from './entities/applier_info/paperReq.entity';
import { CapacityValue } from './entities/applier_info/capacityValue.entity';
import { ScoreBoard } from './entities/scoreBoard.entity';
import { RecruitmentSeeder } from './seeder/recruitment.seeder';
import { AuthService } from './auth/auth.service';
import { ApplierService } from './auth/applier/applier.service';
import { RecruiterService } from './auth/recruiter/recruiter.service';
import { JwtService } from '@nestjs/jwt';
import { RecruitmentService } from './recruitment/recruitment.service';
import { GradingSeeder } from './seeder/grading.seeder';
import { ApplierSeeder } from './seeder/applier.seeder';
import { HistorySeeder } from './seeder/history.seeder';
import { History } from './entities/applier_info/history.entity';
import { Grading } from './entities/grading.entity';
import { UpperCategoryGrading } from './entities/upperCategoryGrading.entity';
import { UpperCategoryScoreBoard } from './entities/upperCategoryScoreBoard.entity';
import { PossibleWorkType } from './entities/applier_info/possibleWorkType.entity';
import { WorkTypeSeeder } from './seeder/workType.seeder';
import { CapacityValueSeeder } from './seeder/capacityValue.seeder';
import { PaperReqSeeder } from './seeder/paperReq.seeder';
import { ApplicationSeeder } from './seeder/application.seeder';
import { FinanceSeeder } from './seeder/finance.seeder';
import { ScoreBoardSeeder } from './seeder/scoreBoard.seeder';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: 'ji-hokim',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_DATABASE,
  entities: [
    Recruiter,
    Recruitment,
    Application,
    Applier,
    Finance,
    PaperReq,
    CapacityValue,
    ScoreBoard,
    History,
    Grading,
    UpperCategoryGrading,
    UpperCategoryScoreBoard,
    PossibleWorkType,
  ],
  synchronize: true,
};

seeder({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  providers: [
    AuthService,
    ApplierService,
    RecruiterService,
    JwtService,
    RecruitmentService,
  ],
}).run([
  RecruiterSeeder,
  RecruitmentSeeder,
  GradingSeeder,
  ApplierSeeder,
  ApplicationSeeder,
  FinanceSeeder,
  HistorySeeder,
  WorkTypeSeeder,
  CapacityValueSeeder,
  PaperReqSeeder,
  ScoreBoardSeeder,
]);
