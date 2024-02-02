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
import { History } from 'src/entities/applier_info/history.entity';
import { CapacityValue } from 'src/entities/applier_info/capacityValue.entity';
import { PossibleWorkType } from 'src/entities/applier_info/possibleWorkType.entity';

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
  workType: string;

  @Column()
  esg: boolean;

  @OneToMany((type) => Application, (application) => application.applier, {
    cascade: true,
  })
  appliedList: Application[];

  @OneToOne(() => Finance, {
    cascade: true,
  })
  finance: Finance;

  @OneToMany(
    (type) => CapacityValue,
    (capacityValue) => capacityValue.applier,
    {
      cascade: true,
    },
  )
  capacityValueList: CapacityValue[];

  @OneToMany(() => PaperReq, (paperReq) => paperReq.applier, {
    cascade: true,
  })
  paperReqList: PaperReq[];

  @OneToMany((type) => History, (history) => history.applier, {
    cascade: true,
  })
  historyList: History[];

  @OneToMany(
    (type) => PossibleWorkType,
    (possibleWorkType) => possibleWorkType.applier,
    {
      cascade: true,
    },
  )
  possibleWorkTypeList: PossibleWorkType[];
}
