import { Applier } from '../../auth/applier/applier.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Finance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creditGrade: string;

  @Column()
  cashFlowGrade: string;

  @Column()
  watchGrade: string;

  @Column()
  salesRevenue: number;

  @Column()
  operatingMarginRatio: number;

  @Column()
  netProfitMarginRatio: number;

  @Column()
  currentRatio: number;

  @Column()
  quickRatio: number;

  @Column()
  debtToEquityRatio: number;

  @Column()
  debtDependency: number;

  @OneToOne((type) => Applier, (applier) => applier.finance)
  applier: Applier;
}
