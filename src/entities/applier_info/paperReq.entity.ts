import { Applier } from '../../auth/applier/applier.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PaperReq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentName: string;

  @Column()
  documentUrl: string;

  @ManyToOne((type) => Applier, (applier) => applier.paperReqList)
  applier: Applier;
}
