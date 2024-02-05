import { Seeder } from 'nestjs-seeder';
import { DataSource } from 'typeorm';
import applierData from './seedingData/applier.json';
import { Applier } from '../auth/applier/applier.entity';
import { PaperReq } from '../entities/applier_info/paperReq.entity';
import { query } from 'express';
import { InjectDataSource } from '@nestjs/typeorm';

export class PaperReqSeeder implements Seeder {
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
        for (const paper of applier.paperReq) {
          const newPaper = queryRunner.manager.create(PaperReq, {
            ...paper,
            applier: currentApplier,
          });
          await queryRunner.manager.save(PaperReq, newPaper);
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
    await this.dataSource.manager.delete(PaperReq, {});
  }
}
