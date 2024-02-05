import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UpperCategoryGrading } from './upperCategoryGrading.entity';

@Entity()
export class Grading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  perfectScore: number;

  @ManyToOne(
    (type) => UpperCategoryGrading,
    (upperCategoryGrading) => upperCategoryGrading.gradingList,
  )
  upperCategoryGrading: UpperCategoryGrading;
}
