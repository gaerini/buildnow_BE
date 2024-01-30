import { InjectEntityManager } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { Recruitment } from '../entities/recruitment.entity';
import { RecruitmentService } from '../recruitment/recruitment.service';
import { EntityManager } from 'typeorm';

export class RecruitmentSeeder implements Seeder {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
    private readonly recruitmentService: RecruitmentService,
  ) {}

  async seed(): Promise<any> {
    const recruiter = await this.em.findOneBy(Recruiter, {
      businessId: '123-45-67890',
    });
    const testRecruitment = await this.recruitmentService.createRecruitment(
      {
        deadline: '20241212',
        workType: '지반조성 및 포장공사',
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
      },
      recruiter,
    );
  }

  async drop(): Promise<any> {
    await this.em.delete(Recruitment, {});
  }
}
