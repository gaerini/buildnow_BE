import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { Recruitment } from '../entities/recruitment.entity';
import { RecruitmentService } from '../recruitment/recruitment.service';
import { DataSource, EntityManager } from 'typeorm';
import { UpperCategoryGrading } from '../entities/upperCategoryGrading.entity';
import { Application } from '../entities/application.entity';
import { Grading } from '../entities/grading.entity';
import requirementList from './seedingData/requirement.json';
import { Requirement } from '../entities/requirement.entity';
import recruitingWorkTypeList from './seedingData/recruitingWorkType.json';
import { RecruitingWorkType } from '../entities/recruitingWorkType.entity';

export class RecruitmentSeeder implements Seeder {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    private readonly recruitmentService: RecruitmentService,
  ) {}

  async seed(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const recruiter = await this.dataSource.manager.findOneBy(Recruiter, {
        businessId: '123-45-67890',
      });
      console.log(recruiter);
      const testRecruitment = this.dataSource.manager.create(Recruitment, {
        deadline: '20241212',
        threshold: 90,
        recruiter: recruiter,
      });
      const savedRecruitment = await this.dataSource.manager.save(
        Recruitment,
        testRecruitment,
      );

      //requirement 엔티티 채우기
      for (const documentName of requirementList) {
        const document = this.dataSource.manager.create(Requirement, {
          documentName: documentName,
          recruitment: savedRecruitment,
        });
        await this.dataSource.manager.save(Requirement, document);
      }

      //recruiting 엔티티 채우기
      for (const recruiting of recruitingWorkTypeList) {
        const workType = this.dataSource.manager.create(RecruitingWorkType, {
          workType: recruiting,
          recruitment: savedRecruitment,
        });
        await this.dataSource.manager.save(RecruitingWorkType, workType);
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
      await queryRunner.manager.delete(Application, {});
      await queryRunner.manager.delete(Recruitment, {});
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
