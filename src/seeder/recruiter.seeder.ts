import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { DataSource, EntityManager } from 'typeorm';
import { RecruiterService } from '../auth/recruiter/recruiter.service';
import { AuthService } from '../auth/auth.service';
import { Recruitment } from '../entities/recruitment.entity';

@Injectable()
export class RecruiterSeeder implements Seeder {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    private readonly authService: AuthService,
  ) {}

  async seed(): Promise<void> {
    const testRecruiter = await this.authService.signUpRecruiter({
      businessId: '123-45-67890',
      password: '1234',
      managerName: 'jiho',
      companyName: 'buildnow',
    });

    return;
  }

  async drop(): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(Recruitment, {});
      await queryRunner.manager.delete(Recruiter, {});
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
