import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Recruitment } from './recruitment.entity';
import { Applier } from '../auth/applier/applier.entity';

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
}
