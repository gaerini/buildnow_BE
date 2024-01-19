import { Body, Controller, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { Application } from 'src/entities/application.entity';
import { ApplicationService } from './application.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Applier } from 'src/auth/applier/applier.entity';
import { NewApplicationDto } from './dto/newApplication.dto';

@Controller('application')
@UseGuards(AuthGuard())
export class ApplicationController {

    private logger = new Logger('application');

    constructor(
        private applicationService: ApplicationService,
    ){}

    @Get('masterFindAll')
    findAll(): Promise<Application[]>{
        return this.applicationService.findAll();
    }

    @Post(':recruitmentId')
    async createApplicatoin(@Param('recruitmentId') recruitmentId: number, @GetUser() applier: Applier, @Body() newApplicationDto: NewApplicationDto): Promise<void> {
        await this.applicationService.applyToRecruitment(applier.id, recruitmentId, newApplicationDto);
        this.logger.verbose(`${applier.companyName} applied to #${recruitmentId}recruitment`);
        return
    }
}
