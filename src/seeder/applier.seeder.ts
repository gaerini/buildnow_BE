import { Seeder } from 'nestjs-seeder';
import { AuthService } from 'src/auth/auth.service';
import applierData from './seedingData/applier.json';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Applier } from 'src/auth/applier/applier.entity';
export class ApplierSeeder implements Seeder {
  constructor(
    @InjectEntityManager()
    private em: EntityManager,
    private readonly authService: AuthService,
  ) {}

  async seed(): Promise<any> {
    for (const temp of applierData) {
      const businessId = temp.businessId;
      const password = temp.password;
      const companyName = temp.companyName;
      const ceoName = temp.ceoName;
      const companyAddress = temp.companyAddress;
      const managerName = temp.managerName;
      const managerPhoneNum = temp.mangerPhoneNum;
      const managerEmail = temp.managerEmail;
      const corporateApplicationNum = temp.corporateApplicationNum;
      const workType = temp.workType;
      await this.authService.signUpApplier({
        businessId,
        password,
        companyName,
        ceoName,
        companyAddress,
        managerName,
        managerPhoneNum,
        managerEmail,
        corporateApplicationNum,
      });
    }
  }

  async drop(): Promise<any> {
    await this.em.delete(Applier, {});
  }
}
