import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Applier } from '../applier.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  salesRevenue: number;

  @Column()
  salesProportion: number;

  @Column()
  grade: string;

  @Column()
  WATCH: string;

  @ManyToOne((type) => Applier, (applier) => applier.clientList)
  @JoinColumn()
  applier: Applier;
}
