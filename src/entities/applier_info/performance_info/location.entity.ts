import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PerformanceInfo } from './performanceInfo.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mainLocation: string;

  @ManyToOne(
    (type) => PerformanceInfo,
    (performanceInfo) => performanceInfo.locationList,
  )
  @JoinColumn()
  performanceInfo: PerformanceInfo;
}
