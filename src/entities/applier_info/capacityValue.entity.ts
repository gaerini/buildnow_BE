import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Applier } from 'src/auth/applier/applier.entity';

@Entity()
export class CapacityValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  constructionType: string;

  @Column()
  year1: number;

  @Column()
  year2: number;

  @Column()
  year3: number;

  @Column()
  nationalRanking: number;

  @Column()
  regionalRanking: number;

  @Column()
  nationalRankingRatio: number;

  @Column()
  regionalRankingRatio: number;

  @ManyToOne((type) => Applier, (applier) => applier.capacityValueList)
  @JoinColumn()
  applier: Applier;
}
