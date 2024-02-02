import { Applier } from 'src/auth/applier/applier.entity';
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
  documentURL: string;

  @ManyToOne((type) => Applier, (applier) => applier.paperReqList)
  applier: Applier;
}
