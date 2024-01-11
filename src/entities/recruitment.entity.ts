import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recruiter } from '../auth/recruiter.entity';
import { Application } from './application.entity';

@Entity()
export class Recruitment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deadline: number;

  @Column()
  workType: string;

  @Column()
  requirements: string;

  @Column()
  applyingFormat: string;

  @ManyToOne((type) => Recruiter, (recruiter) => recruiter.recruitments)
  @JoinColumn()
  recruiter: Recruiter;

  @OneToMany((type) => Application, (application) => application.recruitment, {
    cascade: true,
  })
  applicationList: Application[];
}
