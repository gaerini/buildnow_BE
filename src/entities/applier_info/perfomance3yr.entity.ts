import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Applier } from '../applier.entity';

@Entity()
export class Performance3yr {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderingParty: string;

  @Column()
  type: string;

  @Column()
  primeContractor: string;

  @Column()
  constructionType: string;

  @Column()
  constructionName: string;

  @Column()
  contractAmount: number;

  @Column()
  constructoinStart: Date;

  @Column()
  expectedConstructionEnd: Date;

  @Column()
  accumulatePerformanceAmount: number;

  @Column()
  outstandingPerformanceAmount: number;

  @Column()
  isPatent: boolean;

  @Column()
  constructionSite: string;

  @Column()
  constructionBuilding: string;

  @ManyToOne((type) => Applier, (applier) => applier.performance3yrList)
  @JoinColumn()
  applier: Applier;
}
