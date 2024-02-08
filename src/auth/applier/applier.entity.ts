import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Application } from '../../entities/application.entity';
import { Finance } from '../../entities/applier_info/finance.entity';
import { PaperReq } from '../../entities/applier_info/paperReq.entity';
import { History } from '../../entities/applier_info/history.entity';
import { PossibleWorkType } from '../../entities/applier_info/possibleWorkType.entity';

@Entity()
@Unique(['businessId'])
export class Applier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  businessId: string;

  @Column()
  password: string;

  @Column()
  companyName: string;

  @Column()
  ceoName: string;

  @Column()
  companyAddress: string;

  @Column()
  managerName: string;

  @Column()
  managerPhoneNum: string;

  @Column()
  managerEmail: string;

  @Column()
  corporateApplicationNum: string;

  @Column()
  esg: boolean;

  @Column()
  companyPhoneNum: string;

  @Column()
  companyIntro: string;

  @Column()
  hadAccident: boolean;

  @Column({ type: 'date' })
  estDate: Date;

  @OneToMany((type) => Application, (application) => application.applier, {
    cascade: ['remove'],
  })
  appliedList: Application[];

  @OneToOne(() => Finance, (finance) => finance.applier, {
    cascade: ['remove'],
  })
  @JoinColumn()
  finance: Finance;

  @OneToMany(() => PaperReq, (paperReq) => paperReq.applier, {
    cascade: ['remove'],
  })
  paperReqList: PaperReq[];

  @OneToMany((type) => History, (history) => history.applier, {
    cascade: ['remove'],
  })
  historyList: History[];

  @OneToMany(
    (type) => PossibleWorkType,
    (possibleWorkType) => possibleWorkType.applier,
    {
      cascade: ['remove'],
    },
  )
  possibleWorkTypeList: PossibleWorkType[];
}
