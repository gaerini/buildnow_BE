import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Recruitment } from 'src/entities/recruitment.entity';
import { EntityManager } from 'typeorm';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { Recruiter } from 'src/auth/recruiter.entity';

@Injectable()
export class RecruitmentService {
    constructor(
        @InjectEntityManager()
        private em: EntityManager,
    ){}

    findAll(recruiter: Recruiter): Promise<Recruitment[]>{
        return this.em.findBy(Recruitment, {
            recruiter: recruiter,
        });
    }

    async createRecruitment(createRecruitmentDto: CreateRecruitmentDto, recruiter: Recruiter): Promise<Recruitment> {
        const {deadline, workType, requirements, applyingFormat} = createRecruitmentDto;
        const newRecruitment = this.em.create(Recruitment, {deadline, workType, requirements, applyingFormat, recruiter});
        console.log(recruiter);
        return await this.em.save(Recruitment, newRecruitment);
        
    }
}
