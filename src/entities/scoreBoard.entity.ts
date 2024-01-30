import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Application } from './application.entity';
import { Grading } from './grading.entity';

@Entity()
@Unique(['application'])
export class ScoreBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @ManyToOne((type) => Application, (application) => application.scoreList)
  application: Application;

  @OneToOne(() => Grading, (grading) => grading.scoreBoard, {})
  grading: Grading;
}
