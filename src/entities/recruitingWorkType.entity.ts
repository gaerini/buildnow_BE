import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recruitment } from './recruitment.entity';

@Entity()
export class RecruitingWorkType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workType: string;

  @ManyToOne(
    () => Recruitment,
    (recruitment) => recruitment.recruitingWorkTypeList,
  )
  recruitment: Recruitment;
}
