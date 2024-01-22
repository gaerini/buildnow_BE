import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Recruitment } from './recruitment.entity';
import { Applier } from '../auth/applier/applier.entity';
import { ScoreBoard } from './scoreBoard.entity';

@Entity()
@Unique(['recruitment', 'applier'])
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isNew: boolean;

  @Column()
  isRecommended: boolean;

  @CreateDateColumn()
  appliedDate: Date;

  @ManyToOne(
    (type) => Recruitment,
    (recruitment) => recruitment.applicationList,
  )
  recruitment: Recruitment;

  @ManyToOne((type) => Applier, (applier) => applier.appliedList)
  applier: Applier;

  @OneToMany((type)=>ScoreBoard, (scoreBoard)=>scoreBoard.application)
  scoreList: ScoreBoard[];
}
