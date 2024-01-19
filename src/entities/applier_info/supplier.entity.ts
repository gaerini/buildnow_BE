import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Applier } from '../../auth/applier/applier.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  purchasePrice: number;

  @Column()
  purchaseProportion: number;

  @Column()
  grade: string;

  @Column()
  WATCH: string;

  @ManyToOne((type) => Applier, (applier) => applier.clientList)
  @JoinColumn()
  applier: Applier;
}
