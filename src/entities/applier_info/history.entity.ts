import { Applier } from '../../auth/applier/applier.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dateField: Date;

  @Column()
  detail: string;

  @ManyToOne((type) => Applier, (applier) => applier.historyList)
  applier: Applier;
}
