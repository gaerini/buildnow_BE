import { Applier } from '../../auth/applier/applier.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CapacityValue } from './capacityValue.entity';

@Entity()
export class PossibleWorkType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workType: string;

  @ManyToOne((type) => Applier, (applier) => applier.possibleWorkTypeList)
  applier: Applier;

  @OneToMany(
    (type) => CapacityValue,
    (capacityValue) => capacityValue.possibleWorktype,
    {
      cascade: ['remove'],
    },
  )
  capacityValueList: CapacityValue[];
}
