import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Applier } from './applier.entity';
import { SignUpApplierDto } from '../dto/signUp-applier.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ApplierService {
  constructor(
    @InjectEntityManager()
    private em: EntityManager,
  ) {}

  findAll(): Promise<Applier[]> {
    return this.em.find(Applier);
  }

  async findOne(businessId: string): Promise<Applier> {
    return await this.em.findOne(Applier, {
      where: { businessId: businessId },
    });
  }

  async createApplier(signUpApplierDto: SignUpApplierDto): Promise<void> {
    const {
      businessId,
      password,
      companyName,
      ceoName,
      companyAddress,
      managerName,
      managerPhoneNum,
      managerEmail,
      corporateApplicationNum,
    } = signUpApplierDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newApplier = this.em.create(Applier, {
      businessId,
      password: hashedPassword,
      companyName,
      ceoName,
      companyAddress,
      managerName,
      managerPhoneNum,
      managerEmail,
      corporateApplicationNum,
    });

    try {
      await this.em.save(newApplier);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`Already existing businessId`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
