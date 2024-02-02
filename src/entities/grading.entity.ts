import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Recruitment } from './recruitment.entity';
import { ScoreBoard } from './scoreBoard.entity';
import { UpperCategoryGrading } from './upperCategoryGrading.entity';

@Entity()
@Unique(['upperCategory', 'category', 'recruitment'])
export class Grading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  upperCategory: string;

  @Column()
  category: string;

  @Column()
  perfectScore: number;

  @Column()
  threshold: number;

  @ManyToOne(
    (type) => UpperCategoryGrading,
    (upperCategoryGrading) => upperCategoryGrading.gradingList,
  )
  upperCategoryGrading: UpperCategoryGrading;
}
