import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Recruitment } from 'src/entities/recruitment.entity';
import { EntityManager } from 'typeorm';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { Recruiter } from 'src/auth/recruiter.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class RecruitmentService {
    constructor(
        @InjectEntityManager()
        private em: EntityManager,
    ){}

    findAll(): Promise<Recruitment[]>{
        return this.em.find(Recruitment);
    }

    findAllByRecruiter(recruiter: Recruiter): Promise<Recruitment[]>{
        return this.em.findBy(Recruitment, {
            recruiter: recruiter,
        });
    }

    async deleteRecruitment(id: number, recruiter: Recruiter): Promise<void>{
        const result = await this.em.delete(Recruitment, {
            id: id,
            recruiter : recruiter
        });

        if(!result.affected){
            throw new NotFoundException(`Can't find Recruitment with id ${id}`);
        }
    }

    async createRecruitment(createRecruitmentDto: CreateRecruitmentDto, recruiter: Recruiter): Promise<Recruitment> {
        const {deadline, workType, requirements, applyingFormat} = createRecruitmentDto;
        const newRecruitment = this.em.create(Recruitment, {deadline, workType, requirements, applyingFormat, recruiter});
        return await this.em.save(Recruitment, newRecruitment);
        
    }

}
