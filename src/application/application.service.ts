import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { NewApplicationDto } from './dto/newApplication.dto';
import { Applier } from 'src/auth/applier/applier.entity';
import { Recruitment } from 'src/entities/recruitment.entity';
import { Application } from 'src/entities/application.entity';
import { ApplierService } from 'src/auth/applier/applier.service';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectEntityManager()
        private em: EntityManager,
    ){}

    findAll(): Promise<Application[]>{
        return this.em.find(Application);
    }

    async applyToRecruitment(applierId:number, recruitmentId:number, newApplicationDto:NewApplicationDto): Promise<void>{
        const applier = await this.em.findOneBy(Applier, {
            id: applierId,
        });

        const recruitment = await this.em.findOneBy(Recruitment, {
            id: recruitmentId,
        });

        console.log(newApplicationDto);

        const {isNew, isRecommended} = newApplicationDto;
        let isNewBool:boolean;
        let isRecommendedBool:boolean;
        if(isNew === 'true'){
            isNewBool = true;
        }else {
            isNewBool = false;
        }

        if(isRecommended === 'true'){
            isRecommendedBool = true;
        }else{
            isRecommendedBool = false;
        }
        const newApplication = this.em.create(Application, {isNew: isNewBool, isRecommended: isRecommendedBool, applier:applier, recruitment: recruitment});


        try{
            const application = await this.em.save(newApplication);
        }catch(error){
            console.log(error.code);
            if(error.code === '23505'){
                throw new ConflictException("이미 지원한 내역")
            }
            throw new InternalServerErrorException();
        }
    }
}
