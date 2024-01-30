import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { EntityManager } from 'typeorm';
import { RecruiterService } from '../auth/recruiter/recruiter.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RecruiterSeeder implements Seeder {
  constructor(
    @InjectEntityManager()
    private em: EntityManager,
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
    await this.em.delete(Recruiter, {});
  }
}
