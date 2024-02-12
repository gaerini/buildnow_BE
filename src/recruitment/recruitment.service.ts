import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Recruitment } from '../entities/recruitment.entity';
import { EntityManager } from 'typeorm';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { Recruiter } from '../auth/recruiter/recruiter.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectEntityManager()
    private em: EntityManager,
  ) {}

  findAll(): Promise<Recruitment[]> {
    return this.em.find(Recruitment);
  }

  findAllByRecruiter(recruiter: Recruiter): Promise<Recruitment[]> {
    return this.em.find(Recruitment, {
      where: { recruiter: recruiter },
      relations: [
        'recruitingWorkTypeList',
        'upperCategoryGradingList',
        'upperCategoryGradingList.requirementList',
      ],
    });
  }

  async deleteRecruitment(id: number, recruiter: Recruiter): Promise<void> {
    const result = await this.em.delete(Recruitment, {
      id: id,
      recruiter: recruiter,
    });

    if (!result.affected) {
      throw new NotFoundException(`Can't find Recruitment with id ${id}`);
    }
  }

  async createRecruitment(
    createRecruitmentDto: CreateRecruitmentDto,
    recruiter: Recruiter,
  ): Promise<Recruitment> {
    const { deadline, workType, requirements } = createRecruitmentDto;
    const newRecruitment = this.em.create(Recruitment, {
      deadline,
      recruiter,
    });
    return await this.em.save(Recruitment, newRecruitment);
  }
}
