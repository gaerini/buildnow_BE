import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { Grading } from '../entities/grading.entity';
import { DataSource, EntityManager } from 'typeorm';
import GradingData from './seedingData/grading.json';
import { InternalServerErrorException } from '@nestjs/common';
import { UpperCategoryGrading } from '../entities/upperCategoryGrading.entity';
import { Recruitment } from '../entities/recruitment.entity';

export class GradingSeeder implements Seeder {
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

      for (const temp of GradingData) {
        const upperCategory = temp.upperCategory;
        const newUpperCategory = queryRunner.manager.create(
          UpperCategoryGrading,
          { upperCategory: upperCategory, recruitment: recruitment },
        );
        await queryRunner.manager.save(newUpperCategory);
        const tempUpperCategory = await queryRunner.manager.findOneBy(
          UpperCategoryGrading,
          {
            upperCategory: upperCategory,
          },
        );
        for (const detail of temp.detail) {
          const testGrading = queryRunner.manager.create(Grading, {
            ...detail,
            upperCategoryGrading: tempUpperCategory,
          });
          await queryRunner.manager.save(Grading, testGrading);
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(Grading, {});
      await queryRunner.manager.delete(UpperCategoryGrading, {});
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
