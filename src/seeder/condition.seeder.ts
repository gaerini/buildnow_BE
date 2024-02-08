import { InjectDataSource } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Recruitment } from '../entities/recruitment.entity';
import { DataSource } from 'typeorm';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { Condition } from '../entities/condition.entity';

export class ConditionSeeder implements Seeder {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async seed(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const recruitment = await queryRunner.manager.findOne(Recruitment, {
        where: {
          recruiter: await queryRunner.manager.findOne(Recruiter, {
            where: { businessId: '123-45-67890' },
          }),
        },
      });

      const condition1 = queryRunner.manager.create(Condition, {
        conditionName: '신용등급',
        conditionValue: 'B0',
        updown: '>=',
        recruitment: recruitment,
      });
      await queryRunner.manager.save(Condition, condition1);

      const condition2 = queryRunner.manager.create(Condition, {
        conditionName: '현금흐름등급',
        conditionValue: 'C+',
        updown: '>=',
        recruitment: recruitment,
      });
      await queryRunner.manager.save(Condition, condition2);
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async drop(): Promise<any> {
    await this.dataSource.manager.delete(Condition, {});
  }
}
