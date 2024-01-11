import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Recruitment } from '../entities/recruitment.entity';

@Entity()
@Unique(['businessId'])
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
