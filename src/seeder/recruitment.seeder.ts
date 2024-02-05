import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { Recruitment } from '../entities/recruitment.entity';
import { RecruitmentService } from '../recruitment/recruitment.service';
import { DataSource, EntityManager } from 'typeorm';
import { UpperCategoryGrading } from '../entities/upperCategoryGrading.entity';
import { Application } from '../entities/application.entity';
import { Grading } from '../entities/grading.entity';

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
        workType: '철근',
        requirements: [
          '지명원',
          '경영상태확인원',
          '법인등기부등본',
          '사업자등록증',
          '건설업등록증',
          '인감증명서',
          '시국세완납증명서',
          '건설산업기본법에_의한_제재처분_확인서',
          '품질관련_인증서(ISO 등)',
          '특허증',
          '시공능력순위확인서',
          '시공능력평가확인서',
          '건설공사실적확인서 (최근 3년간)',
          '신용평가보고서',
          '기술인력리스트',
          '건설기술인_경력수첩',
        ],
        threshold: 90,
        recruiter: recruiter,
      });
      console.log(testRecruitment);
      await this.dataSource.manager.save(Recruitment, testRecruitment);
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
