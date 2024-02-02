import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Grading } from 'src/entities/grading.entity';
import { DataSource, EntityManager } from 'typeorm';
import { InsertGradingDto } from './dto/insert-grading.dto';
import { Recruitment } from 'src/entities/recruitment.entity';

@Injectable()
export class GradingService {
  constructor(
    @InjectEntityManager()
    private em: EntityManager,
    private datasource: DataSource,
  ) {}

  // insertGrading은 phase1에서 백에서만 입력
  async insertGrading(
    insertGradingDto: InsertGradingDto,
    recruitmentId: number,
  ): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { upperCategory, category, perfectScore, threshold } =
        insertGradingDto;
      const recruitment = await this.em.findOne(Recruitment, {
        where: { id: recruitmentId },
      });

      const newGrading = this.em.create(Grading, {
        upperCategory,
        category,
        perfectScore,
        threshold,
        recruitment,
      });
      await this.em.save(Grading, newGrading);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
}
