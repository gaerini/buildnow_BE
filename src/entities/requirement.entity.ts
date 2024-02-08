import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recruitment } from './recruitment.entity';
import { UpperCategoryGrading } from './upperCategoryGrading.entity';

@Entity()
export class Requirement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentName: string;

  @Column()
  isEssential: boolean;

  @ManyToOne(
    () => UpperCategoryGrading,
    (upperCategoryGrading) => upperCategoryGrading.requirementList,
  )
  upperCategoryGrading: UpperCategoryGrading;
}
