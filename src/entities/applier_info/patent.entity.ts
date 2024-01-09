import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Applier } from '../applier.entity';

@Entity()
export class Patent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  patentName: string;

  @Column()
  applicationNum: number;

  @Column()
  registrationNum: number;

  @Column()
  announcementDate: Date;

  @ManyToOne((type) => Applier, (applier) => applier.patentList)
  @JoinColumn()
  applier: Applier;
}
