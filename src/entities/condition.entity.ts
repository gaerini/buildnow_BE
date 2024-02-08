import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recruitment } from './recruitment.entity';

@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conditionName: string;

  @Column()
  conditionValue: string;

  @Column()
  updown: string;

  @ManyToOne(() => Recruitment, (recruitment) => recruitment.conditionList)
  recruitment: Recruitment;
}
