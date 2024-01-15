import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { NewApplication } from './dto/newApplication.dto';
import { Applier } from 'src/auth/applier/applier.entity';
import { Recruitment } from 'src/entities/recruitment.entity';
import { Application } from 'src/entities/application.entity';

@Injectable()
export class ApplicationService {
    constructor(
        @InjectEntityManager()
        private em: EntityManager,
    ){}

    async applyToRecruitment(applierId:number, recruitmentId:number, newApplication:NewApplication): Promise<void>{
        const applier = await this.em.findOneBy(Applier, {
            id: applierId,
        });

        const recruitment = await this.em.findOneBy(Recruitment, {
            id: recruitmentId,
        });

        const application = new Application();

        application.isNew = newApplication.isNew;
        application.isRecommended = newApplication.isRecomended;
        application.applier = applier;
        application.recruitment = recruitment;

        await this.em.save(application);
    }
}
