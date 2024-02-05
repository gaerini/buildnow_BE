import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { Grading } from '../entities/grading.entity';
import { DataSource, EntityManager } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { UpperCategoryGrading } from '../entities/upperCategoryGrading.entity';
import { UpperCategoryScoreBoard } from '../entities/upperCategoryScoreBoard.entity';
import { Application } from '../entities/application.entity';
import scoreData from './seedingData/scoreBoard.json';
import { Applier } from '../auth/applier/applier.entity';
import { ScoreBoard } from '../entities/scoreBoard.entity';
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
      const application = await queryRunner.manager.find(Application, {
        relations: ['applier'],
      });

      for (const temp of scoreData) {
        const application = await queryRunner.manager.findOne(Application, {
          where: { id: temp.id },
        });
        for (const score of temp.scores) {
          const newUpperCategory = queryRunner.manager.create(
            UpperCategoryScoreBoard,
            {
              upperCategory: score.upperCategory,
              application: application,
            },
          );
          const tempUpperCategory = await queryRunner.manager.save(
            UpperCategoryScoreBoard,
            newUpperCategory,
          );
          for (const detail of score.detail) {
            const testScore = queryRunner.manager.create(ScoreBoard, {
              ...detail,
              upperCategoryScoreBoard: tempUpperCategory,
            });
            await queryRunner.manager.save(ScoreBoard, testScore);
          }
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
    await this.dataSource.manager.delete(UpperCategoryScoreBoard, {});
  }
}
