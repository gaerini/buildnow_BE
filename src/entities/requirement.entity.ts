import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recruitment } from './recruitment.entity';

@Entity()
export class Requirement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentName: string;

  @ManyToOne(() => Recruitment, (recruitment) => recruitment.requirementList)
  recruitment: Recruitment;
}
