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

@Entity()
export class Recruitment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deadline: string;

  @Column()
  workType: string;

  @Column('text', { array: true })
  requirements: string[];

  @Column()
  threshold: number;

  @ManyToOne((type) => Recruiter, (recruiter) => recruiter.recruitments)
  recruiter: Recruiter;

  @OneToMany((type) => Application, (application) => application.recruitment, {
    cascade: ['remove'],
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
}
