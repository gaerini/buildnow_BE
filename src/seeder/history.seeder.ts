import { InjectEntityManager } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { DataSource, EntityManager } from 'typeorm';
import applierData from './seedingData/applier.json';
import { Applier } from 'src/auth/applier/applier.entity';
import { History } from 'src/entities/applier_info/history.entity';
import { InternalServerErrorException } from '@nestjs/common';

export class HistorySeeder implements Seeder {
  constructor(private dataSource: DataSource) {}

  async seed(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const temp of applierData) {
        const businessId = temp.businessId;
        const applier = await queryRunner.manager.findOneBy(Applier, {
          businessId: businessId,
        });

        for (const tempHistory of temp.history) {
          const newHistory = queryRunner.manager.create(History, {
            dateField: tempHistory[0],
            detail: tempHistory[1],
            applier: applier,
          });
          await queryRunner.manager.save(History, newHistory);
        }
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async drop(): Promise<any> {
    await this.dataSource.manager.delete(History, {});
  }
}
