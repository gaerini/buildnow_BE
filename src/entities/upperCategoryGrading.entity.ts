import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recruitment } from './recruitment.entity';
import { Grading } from './grading.entity';

@Entity()
export class UpperCategoryGrading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  upperCategory: string;

  @ManyToOne(
    (type) => Recruitment,
    (recruitment) => recruitment.upperCategoryGradingList,
  )
  recruitment: Recruitment;

  @OneToMany((type) => Grading, (grading) => grading.upperCategoryGrading, {
    cascade: ['remove'],
  })
  gradingList: Grading[];
}
