import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { DataSource, EntityManager, EntityNotFoundError } from 'typeorm';
import { NewApplicationDto } from './dto/newApplication.dto';
import { Applier } from 'src/auth/applier/applier.entity';
import { Recruitment } from 'src/entities/recruitment.entity';
import { Application } from 'src/entities/application.entity';
import { ApplierService } from 'src/auth/applier/applier.service';
import { ScoreBoard } from 'src/entities/scoreBoard.entity';
import { NewScores } from './dto/newScores.dto';
import { UpdateScoresDto } from './dto/updateScores.dto';
import { Recruiter } from 'src/auth/recruiter/recruiter.entity';
import { Finance } from 'src/entities/applier_info/finance.entity';
import { PaperReq } from 'src/entities/applier_info/paperReq.entity';
import { Requirement } from 'src/entities/requirement.entity';
import { UpperCategoryGrading } from 'src/entities/upperCategoryGrading.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<Application[]> {
    return this.dataSource.manager.find(Application);
  }

  async findMyApplicants(recruiter: Recruiter): Promise<any> {
    try {
      const recruitment = await this.dataSource.manager.findOne(Recruitment, {
        where: { recruiter: recruiter },
        relations: [
          'recruiter',
          'applicationList',
          'upperCategoryGradingList',
          'upperCategoryGradingList.gradingList',
          'upperCategoryGradingList.requirementList',

          'conditionList',
        ],
      });

      if (!recruitment) {
        throw new NotFoundException(
          '해당되는 recruitment가 존재하지 않습니다.',
        );
      } else if (recruitment.recruiter.businessId !== recruiter.businessId) {
        throw new ForbiddenException('권한이 없습니다.');
      } else {
        const applierList = [];
        const gradingObj = {};

        recruitment.upperCategoryGradingList.forEach((upperCategoryGrading) => {
          const upperCategory = upperCategoryGrading.upperCategory;
          const totalScore = upperCategoryGrading.gradingList.reduce(
            (acc, grading) => {
              return acc + grading.perfectScore;
            },
            0,
          );
          //total score 상위항목별 합계 계산
          gradingObj[upperCategory] = totalScore;
        });

        for (const application of recruitment.applicationList) {
          const tempApplication = await this.dataSource.manager.findOne(
            Application,
            {
              where: { id: application.id },
              relations: [
                'applier',
                'upperCategoryScoreBoardList',
                'upperCategoryScoreBoardList.scoreBoardList',
              ],
            },
          );

          const applierObj = {};
          //return 오브젝트에 사업자번호 할당
          applierObj['companyName'] = tempApplication.applier.companyName;
          applierObj['businessId'] = tempApplication.applier.businessId;
          const scoreObj = {};
          let scoreSum = 0;
          tempApplication.upperCategoryScoreBoardList.forEach(
            (upperCategoryScoreBoard) => {
              const upperCategory = upperCategoryScoreBoard.upperCategory;
              const totalScore = upperCategoryScoreBoard.scoreBoardList.reduce(
                (acc, scoreBoard) => {
                  scoreSum += scoreBoard.score;
                  return acc + scoreBoard.score;
                },
                0,
              );
              //score 상위항목별 합계 계산
              scoreObj[upperCategory] = totalScore;
            },
          );
          applierObj['score'] = scoreObj;
          applierObj['isPass'] = '미정';
          recruitment.conditionList.forEach(async (condition) => {
            const beEval = await this.dataSource.manager.findOne(Finance, {
              where: { applier: tempApplication.applier },
            });

            //만약 crerditGrade가 미달 조건이라면
            if (
              this.identifyingString(condition.conditionName) === 'creditGrade'
            ) {
              if (
                this.changeGradeToScore(condition.conditionValue) >
                this.changeGradeToScore(beEval.creditGrade)
              ) {
                applierObj['isPass'] = '미달';
              }
            } else if (
              this.identifyingString(condition.conditionName) ===
              'cashFlowGrade'
            ) {
              if (
                this.changeGradeToScore(condition.conditionValue) >
                this.changeGradeToScore(beEval.cashFlowGrade)
              ) {
                applierObj['isPass'] = '미달';
              }
            }
          });
          const upperCategoryList = await this.dataSource.manager.find(
            UpperCategoryGrading,
            {
              where: {
                recruitment: await this.dataSource.manager.findOne(
                  Recruitment,
                  {
                    where: { recruiter: recruiter },
                  },
                ),
              },
              relations: ['requirementList', 'recruitment'],
            },
          );

          for (const upperCategory of upperCategoryList) {
            for (const reqPaper of upperCategory.requirementList) {
              if (reqPaper.isEssential) {
                const isExist = await this.dataSource.manager.find(PaperReq, {
                  where: {
                    documentName: reqPaper.documentName,
                    applier: tempApplication.applier,
                  },
                });
                if (isExist.length === 0) {
                  applierObj['isPass'] = '미달';
                  break;
                }
              }
            }
          }

          if (
            applierObj['isPass'] === '미정' ||
            applierObj['isPass'] === null
          ) {
            if (recruitment.threshold <= scoreSum) {
              applierObj['isPass'] = '통과';
            } else {
              applierObj['isPass'] = '탈락';
            }
          }
          if (applierObj['isPass'] === '미달') {
            applierObj['isChecked'] = true;
          } else {
            applierObj['isChecked'] = tempApplication.isChecked;
          }
          applierObj['applyingWorkType'] = tempApplication.applyingWorkType;
          applierObj['isRead'] = tempApplication.isRead;
          applierObj['scoreSum'] = scoreSum;
          applierList.push(applierObj);
        }
        const returnObj = {
          total: gradingObj,
          applier: { score: applierList },
        };
        return returnObj;
      }
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async applicantInfoByBusinessId(recruiter: Recruiter, businessId: string) {
    const recruitment = await this.dataSource.manager.findOne(Recruitment, {
      where: { recruiter: recruiter },
      relations: [
        'recruiter',
        'upperCategoryGradingList',
        'upperCategoryGradingList.gradingList',
        'upperCategoryGradingList.requirementList',
      ],
    });

    if (!recruitment) {
      throw new NotFoundException('해당되는 recruitment가 존재하지 않습니다.');
    } else if (recruitment.recruiter.businessId !== recruiter.businessId) {
      throw new ForbiddenException('권한이 없습니다.');
    } else {
      const applier = await this.dataSource.manager.findOne(Applier, {
        where: { businessId: businessId },
        relations: [
          'appliedList',
          'appliedList.upperCategoryScoreBoardList',
          'appliedList.upperCategoryScoreBoardList.scoreBoardList',
          'paperReqList',
          'historyList',
          'possibleWorkTypeList',
          'possibleWorkTypeList.capacityValueList',
          'finance',
        ],
      });
      delete (await applier).password;
      let iso = false;

      for (const paper of applier.paperReqList) {
        if (paper.documentName.includes('ISO')) {
          iso = true;
          break;
        }
      }
      const applierObj = applier;
      applierObj['iso'] = iso;

      return { recruitmentInfo: recruitment, applierInfo: applierObj };
    }
  }

  async updateReadState(
    applierBusinessId: string,
    recruiter: Recruiter,
  ): Promise<any> {
    const applier = await this.dataSource.manager.findOne(Applier, {
      where: { businessId: applierBusinessId },
    });

    const recruitment = await this.dataSource.manager.findOne(Recruitment, {
      where: {
        recruiter: recruiter,
      },
    });

    const application = await this.dataSource.manager.findOne(Application, {
      where: {
        applier: applier,
        recruitment: recruitment,
      },
    });

    return await this.dataSource.manager.update(
      Application,
      {
        id: application.id,
      },
      {
        isRead: true,
      },
    );
  }

  async updateCheckState(
    applierBusinessId: string,
    recruiter: Recruiter,
  ): Promise<any> {
    const applier = await this.dataSource.manager.findOne(Applier, {
      where: { businessId: applierBusinessId },
    });

    const recruitment = await this.dataSource.manager.findOne(Recruitment, {
      where: {
        recruiter: recruiter,
      },
    });

    const application = await this.dataSource.manager.findOne(Application, {
      where: {
        applier: applier,
        recruitment: recruitment,
      },
    });

    return await this.dataSource.manager.update(
      Application,
      {
        id: application.id,
      },
      {
        isChecked: true,
      },
    );
  }

  async applyToRecruitment(
    applierId: number,
    recruitmentId: number,
    newApplicationDto: NewApplicationDto,
  ): Promise<void> {
    const applier = await this.dataSource.manager.findOneBy(Applier, {
      id: applierId,
    });

    const recruitment = await this.dataSource.manager.findOneBy(Recruitment, {
      id: recruitmentId,
    });

    console.log(newApplicationDto);

    const { isNew, isRecommended } = newApplicationDto;
    let isNewBool: boolean;
    let isRecommendedBool: boolean;
    if (isNew === 'true') {
      isNewBool = true;
    } else {
      isNewBool = false;
    }

    if (isRecommended === 'true') {
      isRecommendedBool = true;
    } else {
      isRecommendedBool = false;
    }
    const newApplication = this.dataSource.manager.create(Application, {
      isNew: isNewBool,
      isRecommended: isRecommendedBool,
      applier: applier,
      recruitment: recruitment,
    });

    try {
      const application = await this.dataSource.manager.save(newApplication);
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        throw new ConflictException('이미 지원한 내역');
      }
      throw new InternalServerErrorException();
    }
  }

  normalizeString(str: string): string {
    return str.replace(/\s/g, '').toLowerCase();
  }

  identifyingString(str: string): string {
    const creditPattern = /신용/;
    const gradePattern = /등급/;
    const cashPattern = /현금/;
    const flowPattern = /흐름/;

    if (creditPattern.test(str) && gradePattern.test(str)) {
      return 'creditGrade';
    }

    if (
      gradePattern.test(str) &&
      cashPattern.test(str) &&
      flowPattern.test(str)
    ) {
      return 'cashFlowGrade';
    }
  }

  changeGradeToScore(grade: string): number {
    if (grade === 'AAA') return 24;
    else if (grade === 'AA+') return 23;
    else if (grade === 'AA0' || grade === 'AA') return 22;
    else if (grade === 'AA-') return 21;
    else if (grade === 'A+') return 20;
    else if (grade === 'A0' || grade === 'A') return 19;
    else if (grade === 'A-') return 18;
    else if (grade === 'BBB+') return 17;
    else if (grade === 'BBB' || grade === 'BBB0') return 16;
    else if (grade === 'BBB-') return 15;
    else if (grade === 'BB+') return 14;
    else if (grade === 'BB0' || grade === 'BB') return 13;
    else if (grade === 'BB-') return 12;
    else if (grade === 'B+') return 11;
    else if (grade === 'B0' || grade === 'B') return 10;
    else if (grade === 'B-') return 9;
    else if (grade === 'CCC+') return 8;
    else if (grade === 'CCC0' || grade === 'CCC') return 7;
    else if (grade === 'CCC-') return 6;
    else if (grade === 'CC') return 5;
    else if (grade === 'C') return 4;
    else if (grade === 'D') return 2;
  }
}
