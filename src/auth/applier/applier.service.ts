import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Applier } from './applier.entity';
import { SignUpApplierDto } from '../dto/signUp-applier.dto';
import * as bcrypt from 'bcryptjs';
import { ShowApplierDto } from '../dto/showApplier.dto';

@Injectable()
export class ApplierService {
  constructor(
    @InjectEntityManager()
    private em: EntityManager,
  ) {}

  findAll(): Promise<Applier[]> {
    return this.em.find(Applier);
  }

  async findOne(businessId: string): Promise<ShowApplierDto> {
    const applier = await this.em.findOne(Applier, {
      where: { businessId: businessId },
      relations: [
        'finance',
        'paperReqList',
        'historyList',
        'possibleWorkTypeList',
      ],
    });

    let iso = false;

    for (const paper of applier.paperReqList) {
      if (paper.documentName.includes('ISO')) {
        iso = true;
        break;
      }
    }

    if (!applier)
      throw new NotFoundException(
        '해당 사업자번호의 업체는 지원하지 않았습니다.',
      );
    else {
      let payload = new ShowApplierDto(applier);
      payload.iso = iso;
      return payload;
    }
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
      esg,
      companyPhoneNum,
      companyIntro,
      hadAccident,
      estDate,
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
      esg,
      companyPhoneNum,
      companyIntro,
      hadAccident,
      estDate,
    });

    try {
      await this.em.save(newApplier);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`Already existing businessId`);
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
