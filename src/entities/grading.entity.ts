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
  perfectScore: string;

  @Column()
  threshold: string;

  @ManyToOne((type) => Recruitment, (recruitment) => recruitment.GradingList)
  recruitment: Recruitment;

  @OneToOne(() => ScoreBoard, (scoreBoard) => scoreBoard.grading, {
    cascade: true,
  })
  scoreBoard: ScoreBoard;
}
