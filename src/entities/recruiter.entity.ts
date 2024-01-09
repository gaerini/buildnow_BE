import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recruitment } from './recruitment.entity';

@Entity()
export class Recruiter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  businessId: string;

  @Column()
  password: string;

  @Column()
  managerName: string;

  @Column()
  companyName: string;

  @OneToMany((type) => Recruitment, (recruitment) => recruitment.recruiter, {
    cascade: true,
  })
  recruitments: Recruitment[];
}
