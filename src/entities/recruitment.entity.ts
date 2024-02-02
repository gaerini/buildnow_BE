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
import { Grading } from './grading.entity';
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

  @ManyToOne((type) => Recruiter, (recruiter) => recruiter.recruitments, {
    onDelete: 'CASCADE',
  })
  recruiter: Recruiter;

  @OneToMany((type) => Application, (application) => application.recruitment, {
    cascade: true,
    eager: false,
  })
  applicationList: Application[];

  @OneToMany(
    (type) => UpperCategoryGrading,
    (upperCategoryGrading) => upperCategoryGrading.recruitment,
    {
      cascade: true,
    },
  )
  upperCategoryGradingList: UpperCategoryGrading[];
}
