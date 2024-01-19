import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Building } from './building.entity';
import { WorkTypeRatio } from './workTypeRatio.entity';
import { Location } from './location.entity';
import { CapacityValue } from './capacityValue.entity';

@Entity()
export class PerformanceInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  publicConstruction3yr: number;

  @Column()
  privateConstruction3yr: number;

  @OneToMany((type) => Building, (building) => building.performanceInfo, {
    cascade: true,
  })
  buildingList: Building[];

  @OneToMany(
    (type) => WorkTypeRatio,
    (workTypeRatio) => workTypeRatio.performanceInfo,
    {
      cascade: true,
    },
  )
  workTypeRatioList: WorkTypeRatio[];

  @OneToMany((type) => Location, (location) => location.performanceInfo, {
    cascade: true,
  })
  locationList: Location[];

  @OneToMany((type) => CapacityValue, (capacity) => capacity.performanceInfo, {
    cascade: true,
  })
  capacityValueList: CapacityValue[];
}
