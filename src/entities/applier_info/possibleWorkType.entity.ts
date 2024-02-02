import { Applier } from 'src/auth/applier/applier.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PossibleWorkType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workType: string;

  @Column()
  isApply: boolean;

  @ManyToOne((type) => Applier, (applier) => applier.possibleWorkTypeList)
  applier: Applier;
}
