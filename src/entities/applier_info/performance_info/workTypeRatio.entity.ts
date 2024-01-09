import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerformanceInfo } from './performanceInfo.entity';

@Entity()
export class WorkTypeRatio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workType: string;

  @Column()
  ratio: number;

  @ManyToOne(
    (type) => PerformanceInfo,
    (performanceInfo) => performanceInfo.workTypeRatioList,
  )
  @JoinColumn()
  performanceInfo: PerformanceInfo;
}
