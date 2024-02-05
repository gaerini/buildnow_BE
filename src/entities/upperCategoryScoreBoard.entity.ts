import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from './application.entity';
import { ScoreBoard } from './scoreBoard.entity';

@Entity()
export class UpperCategoryScoreBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  upperCategory: string;

  @ManyToOne(
    (type) => Application,
    (application) => application.upperCategoryScoreBoardList,
  )
  application: Application;

  @OneToMany(
    (type) => ScoreBoard,
    (scoreBoard) => scoreBoard.upperCategoryScoreBoard,
    {
      cascade: ['remove'],
    },
  )
  scoreBoardList: ScoreBoard[];
}
