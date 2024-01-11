import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Recruitment } from 'src/entities/recruitment.entity';
import { RecruitmentService } from './recruitment.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { Recruiter } from 'src/auth/recruiter.entity';

@Controller('recruitment')
@UseGuards(AuthGuard())
export class RecruitmentController {
    constructor(
        private recruitmentService: RecruitmentService,
    ){}

    @Get('master')
    findAll(): Promise<Recruitment[]>{
        return this.recruitmentService.findAll();
    }

    @Get()
    findAllByRecruiter(@GetUser() recruiter:Recruiter): Promise<Recruitment[]> {
        return this.recruitmentService.findAllByRecruiter(recruiter);
    }

    @Post()
    createRecruitment(@Body() createRecruitmentDto: CreateRecruitmentDto, @GetUser() recruiter: Recruiter): Promise<Recruitment> {
        return this.recruitmentService.createRecruitment(createRecruitmentDto, recruiter);
    }
}
