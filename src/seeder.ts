import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { DataSourceOptions } from 'typeorm';
import { Recruiter } from './auth/recruiter/recruiter.entity';
import { RecruiterSeeder } from './seeder/recruiter.seeder';
import { Recruitment } from './entities/recruitment.entity';
import { Application } from './entities/application.entity';
import { Applier } from './auth/applier/applier.entity';
import { Certification } from './entities/applier_info/certification.entity';
import { Finance } from './entities/finance.entity';
import { Client } from './entities/applier_info/client.entity';
import { Supplier } from './entities/applier_info/supplier.entity';
import { Patent } from './entities/applier_info/patent.entity';
import { License } from './entities/applier_info/license.entity';
import { Performance3yr } from './entities/applier_info/perfomance3yr.entity';
import { PaperReq } from './entities/paperReq.entity';
import { PatentPaper } from './entities/patentPaper.entity';
import { PerformanceInfo } from './entities/applier_info/performance_info/performanceInfo.entity';
import { Building } from './entities/applier_info/performance_info/building.entity';
import { CapacityValue } from './entities/applier_info/performance_info/capacityValue.entity';
import { WorkTypeRatio } from './entities/applier_info/performance_info/workTypeRatio.entity';
import { Location } from './entities/applier_info/performance_info/location.entity';
import { ScoreBoard } from './entities/scoreBoard.entity';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ji-hokim',
  password: '',
  database: 'buildnow_test',
  entities: [
    Recruiter,
    Recruitment,
    Application,
    Applier,
    Certification,
    Finance,
    Client,
    Supplier,
    Patent,
    License,
    Performance3yr,
    PaperReq,
    PatentPaper,
    PerformanceInfo,
    Building,
    CapacityValue,
    Location,
    WorkTypeRatio,
    ScoreBoard,
  ],
  synchronize: true,
};

seeder({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Recruiter]),
  ],
}).run([RecruiterSeeder]);
