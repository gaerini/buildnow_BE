import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UpperCategoryScoreBoard } from './upperCategoryScoreBoard.entity';

@Entity()
export class ScoreBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  score: number;

  @ManyToOne(
    (type) => UpperCategoryScoreBoard,
    (upperCategoryScoreBoard) => upperCategoryScoreBoard.scoreBoardList,
  )
  upperCategoryScoreBoard: UpperCategoryScoreBoard;
}
