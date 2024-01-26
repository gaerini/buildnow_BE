import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class RecruiterSeeder implements Seeder {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
  ) {}

  async seed(): Promise<any> {
    const testRecruiter = this.em.create(Recruiter, {
      businessId: '123-45-67890',
      password: '1234',
      managerName: 'jiho',
      companyName: 'buildnow',
    });

    return await this.em.save(testRecruiter);
  }

  async drop(): Promise<any> {
    return await this.em.delete(Recruiter, {});
  }
}
