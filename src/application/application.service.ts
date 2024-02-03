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

@Injectable()
export class ApplicationService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<Application[]> {
    return this.dataSource.manager.find(Application);
  }

  async findMyApplicants(
    recruiter: Recruiter,
    recruitmentId: number,
  ): Promise<Application[]> {
    try {
      const recruitment = await this.dataSource.manager.findOne(Recruitment, {
        where: { id: recruitmentId },
        relations: ['recruiter', 'applicationList'],
      });

      if (!recruitment) {
        throw new NotFoundException(
          '해당되는 recruitment가 존재하지 않습니다.',
        );
      } else if (recruitment.recruiter.businessId !== recruiter.businessId) {
        throw new ForbiddenException('권한이 없습니다.');
      } else {
        return recruitment.applicationList;
      }
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
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

  //   async findScores(applicationId: number): Promise<ScoreBoard[]> {
  //     const application = await this.em.findOne(Application, {
  //       where: { id: applicationId },
  //       relations: ['scoreList'],
  //     });
  //     if (!application) {
  //       throw new NotFoundException();
  //     }
  //     console.log(application.scoreList);
  //     const scoreList = application.scoreList;
  //     return scoreList;
  //   }

  //   async insertScores(
  //     applicationId: number,
  //     newScores: NewScores,
  //   ): Promise<void> {
  //     const application = await this.em.findOneBy(Application, {
  //       id: applicationId,
  //     });

  //     if (!application) {
  //       throw new NotFoundException();
  //     } else {
  //       let { upperCategory, category, score } = newScores;
  //       upperCategory = this.normalizeString(upperCategory);
  //       category = this.normalizeString(category);
  //       const newScore = this.em.create(ScoreBoard, {
  //         upperCategory,
  //         category,
  //         score,
  //         application: application,
  //       });

  //       try {
  //         await this.em.save(newScore);
  //       } catch (err) {
  //         // console.log(err.code);
  //         if (err.code === '23505') {
  //           throw new ConflictException('이미 존재하는 항목입니다.');
  //         } else {
  //           throw new InternalServerErrorException();
  //         }
  //       }
  //     }
  //     return;
  //   }

  //   async updateScores(applicationId: number, updateScoresDto: UpdateScoresDto) {
  //     const application = await this.em.findOne(Application, {
  //       where: { id: applicationId },
  //     });
  //     console.log(updateScoresDto);
  //     const queryRunner = this.dataSource.createQueryRunner();

  //     await queryRunner.connect();
  //     await queryRunner.startTransaction();

  //     try {
  //       for (const newScore of updateScoresDto.scores) {
  //         await queryRunner.manager.update(
  //           ScoreBoard,
  //           {
  //             id: newScore.id,
  //             application: applicationId,
  //           },
  //           { score: newScore.newScore },
  //         );
  //       }
  //       await queryRunner.commitTransaction();
  //     } catch (err) {
  //       console.log(err);
  //       await queryRunner.rollbackTransaction();
  //       throw new InternalServerErrorException(
  //         '트랜잭션 중 오류 발생, 롤백 진행완료',
  //       );
  //     } finally {
  //       await queryRunner.release();
  //     }
  //   }

  normalizeString(str: string): string {
    return str.replace(/\s/g, '').toLowerCase();
  }
}
