import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PossibleWorkType } from './possibleWorkType.entity';

@Entity()
export class CapacityValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year1Value: number;

  @Column()
  year2Value: number;

  @Column()
  year3Value: number;

  @Column()
  nationalRanking: number;

  @Column()
  regionalRanking: number;

  @Column()
  nationalRankingRatio: number;

  @Column()
  regionalRankingRatio: number;

  @ManyToOne(
    (type) => PossibleWorkType,
    (possibleWorkType) => possibleWorkType.capacityValueList,
  )
  possibleWorktype: PossibleWorkType;
}
