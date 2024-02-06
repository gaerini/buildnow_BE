import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { Application } from './application.entity';
import { UpperCategoryGrading } from './upperCategoryGrading.entity';
import { RecruitingWorkType } from './recruitingWorkType.entity';
import { Requirement } from './requirement.entity';

@Entity()
export class Recruitment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deadline: string;

  @Column()
  threshold: number;

  @ManyToOne((type) => Recruiter, (recruiter) => recruiter.recruitments)
  recruiter: Recruiter;

  @OneToMany((type) => Application, (application) => application.recruitment, {
    cascade: true,
  })
  applicationList: Application[];

  @OneToMany(
    (type) => UpperCategoryGrading,
    (upperCategoryGrading) => upperCategoryGrading.recruitment,
    {
      cascade: ['remove'],
    },
  )
  upperCategoryGradingList: UpperCategoryGrading[];

  @OneToMany(
    () => RecruitingWorkType,
    (recruitingWorkType) => recruitingWorkType.recruitment,
  )
  recruitingWorkTypeList: RecruitingWorkType[];

  @OneToMany(() => Requirement, (requirement) => requirement.recruitment)
  requirementList: Requirement[];
}
