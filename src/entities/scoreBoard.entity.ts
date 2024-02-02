import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Application } from './application.entity';
import { UpperCategoryScoreBoard } from './upperCategoryScoreBoard.entity';

@Entity()
@Unique(['application'])
export class ScoreBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  upperCategory: string;

  @Column()
  category: string;

  @Column()
  score: number;

  @ManyToOne(
    (type) => UpperCategoryScoreBoard,
    (upperCategoryScoreBoard) => upperCategoryScoreBoard.scoreboardList,
  )
  upperCategoryScoreBoard: UpperCategoryScoreBoard;
}
