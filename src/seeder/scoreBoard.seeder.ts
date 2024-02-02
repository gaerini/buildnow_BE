import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { Grading } from '../entities/grading.entity';
import { DataSource, EntityManager } from 'typeorm';
import GradingData from './seedingData/grading.json';
import { InternalServerErrorException } from '@nestjs/common';
import { UpperCategoryGrading } from '../entities/upperCategoryGrading.entity';

export class ScoreBoardSeeder implements Seeder {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async seed(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const recruitment = await queryRunner.manager.findOneBy(Recruiter, {
        businessId: '123-45-67890',
      });

      for (const temp of GradingData) {
        const upperCategory = temp.upperCategory;
        const newUpperCategory = queryRunner.manager.create(
          UpperCategoryGrading,
          { upperCategory, recruitment: recruitment },
        );
        const tempUpperCategory =
          await queryRunner.manager.save(newUpperCategory);

        for (const detail of temp.detail) {
          const testGrading = queryRunner.manager.create(Grading, {
            ...detail,
            upperCategoryGrading: tempUpperCategory,
          });
        }
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('에러 발생 롤백 진행');
    } finally {
      await queryRunner.release();
    }
  }

  async drop(): Promise<any> {
    await this.dataSource.manager.delete(UpperCategoryGrading, {});
  }
}
