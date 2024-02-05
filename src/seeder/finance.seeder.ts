import { Seeder } from 'nestjs-seeder';
import { DataSource } from 'typeorm';
import applierData from './seedingData/applier.json';
import { Applier } from '../auth/applier/applier.entity';
import { Finance } from '../entities/applier_info/finance.entity';
import { InjectDataSource } from '@nestjs/typeorm';

export class FinanceSeeder implements Seeder {
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

        const newFinance = queryRunner.manager.create(Finance, {
          ...applier.finance,
          applier: currentApplier,
        });
        await queryRunner.manager.save(Finance, newFinance);
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
    await this.dataSource.manager.delete(Finance, {});
  }
}
