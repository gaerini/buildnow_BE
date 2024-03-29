import { Seeder } from 'nestjs-seeder';
import { DataSource } from 'typeorm';
import applierData from './seedingData/applier.json';
import { query } from 'express';
import { PossibleWorkType } from '../entities/applier_info/possibleWorkType.entity';
import { CapacityValue } from '../entities/applier_info/capacityValue.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { Applier } from '../auth/applier/applier.entity';

export class CapacityValueSeeder implements Seeder {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async seed(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const applier of applierData) {
        const currentApplier = await queryRunner.manager.findOne(Applier, {
          where: { businessId: applier.businessId },
        });

        for (const capacityValue of applier.capacityValue) {
          const { workType, ...restOfCapacityValue } = capacityValue;
          const possibleWorkType = await queryRunner.manager.findOneBy(
            PossibleWorkType,
            {
              workType: workType,
              applier: currentApplier,
            },
          );

          const newCapacityValue = queryRunner.manager.create(CapacityValue, {
            ...restOfCapacityValue,
            possibleWorktype: possibleWorkType,
          });
          await queryRunner.manager.save(CapacityValue, newCapacityValue);
        }
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async drop(): Promise<any> {
    await this.dataSource.manager.delete(CapacityValue, {});
  }
}
