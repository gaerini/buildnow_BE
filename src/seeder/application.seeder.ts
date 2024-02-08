import { InternalServerErrorException } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Applier } from '../auth/applier/applier.entity';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { Application } from '../entities/application.entity';
import { Recruitment } from '../entities/recruitment.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

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

      const applier1 = await queryRunner.manager.findOneBy(Applier, {
        businessId: '23-56-678901',
      });
      const applier2 = await queryRunner.manager.findOneBy(Applier, {
        businessId: '34-56-678901',
      });
      const applier3 = await queryRunner.manager.findOneBy(Applier, {
        businessId: '45-56-678901',
      });
      const newApplication1 = queryRunner.manager.create(Application, {
        isNew: true,
        isRecommended: false,
        recruitment: recruitment,
        applyingWorkType: '철근',
        applier: applier1,
      });
      await queryRunner.manager.save(Application, newApplication1);

      const newApplication2 = queryRunner.manager.create(Application, {
        isNew: false,
        isRecommended: false,
        recruitment: recruitment,
        applyingWorkType: '철골',
        applier: applier2,
      });

      await queryRunner.manager.save(Application, newApplication2);

      const newApplication3 = queryRunner.manager.create(Application, {
        isNew: false,
        isRecommended: true,
        recruitment: recruitment,
        applyingWorkType: '콘크리트',
        applier: applier3,
      });

      await queryRunner.manager.save(Application, newApplication3);

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
