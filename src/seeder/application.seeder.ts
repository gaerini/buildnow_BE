import { InternalServerErrorException } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Applier } from '../auth/applier/applier.entity';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { Application } from '../entities/application.entity';
import { Recruitment } from '../entities/recruitment.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import applierData from './seedingData/applier.json';
export class ApplicationSeeder implements Seeder {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async seed(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const recruiter = await queryRunner.manager.findOneBy(Recruiter, {
        businessId: '123-45-67890',
      });
      const recruitment = await queryRunner.manager.findOneBy(Recruitment, {
        recruiter: recruiter,
      });

      for (const tempApplier of applierData) {
        let workType = '';
        for (const temp of tempApplier.possibleWorkType) {
          if (temp.isApply) workType = temp.workType;
        }
        const applier = await this.dataSource.manager.findOne(Applier, {
          where: { businessId: tempApplier.businessId },
        });
        const tempApplication = this.dataSource.manager.create(Application, {
          isNew: tempApplier.isNew,
          isRecommended: tempApplier.isRecommended,
          isRead: false,
          isChecked: false,
          applyingWorkType: workType,
          recruitment: recruitment,
          applier: applier,
        });

        await this.dataSource.manager.save(Application, tempApplication);
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
    await this.dataSource.manager.delete(Application, {});
  }
}
