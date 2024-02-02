import { Seeder } from 'nestjs-seeder';
import applierData from './seedingData/applier.json';
import { DataSource } from 'typeorm';
import { Applier } from '../auth/applier/applier.entity';
import { PossibleWorkType } from '../entities/applier_info/possibleWorkType.entity';
import { InjectDataSource } from '@nestjs/typeorm';

export class WorkTypeSeeder implements Seeder {
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
        const currentApplier = await queryRunner.manager.findOneBy(Applier, {
          businessId: applier.businessId,
        });
        for (const workType of applier.possibleWorkType) {
          const newWorkType = await queryRunner.manager.create(
            PossibleWorkType,
            {
              workType: workType.workType,
              isApply: workType.isApply,
              applier: currentApplier,
            },
          );
          await queryRunner.manager.save(PossibleWorkType, newWorkType);
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
    await this.dataSource.manager.delete(PossibleWorkType, {});
  }
}
