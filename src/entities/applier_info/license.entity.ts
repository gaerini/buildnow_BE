import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Applier } from '../../auth/applier/applier.entity';

@Entity()
export class License {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licenseName: string;

  @Column()
  licenseNum: number;

  @Column()
  acquisitionDate: Date;

  @Column()
  renewalDate: Date;

  @Column()
  status: string;

  @Column()
  issuingAuthority: string;

  @ManyToOne((type) => Applier, (applier) => applier.licenseList)
  @JoinColumn()
  applier: Applier;
}
