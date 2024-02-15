import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Recruitment } from 'src/entities/recruitment.entity';
import { RecruitmentService } from './recruitment.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { Recruiter } from 'src/auth/recruiter/recruiter.entity';
import { RecruiterGuard } from 'src/auth/recruiter.guard';

@Controller('recruitment')
@UseGuards(AuthGuard('jwt'))
export class RecruitmentController {
  private logger = new Logger('RecruitmentController');
  constructor(private recruitmentService: RecruitmentService) {}

  @Get('master')
  findAll(): Promise<Recruitment[]> {
    return this.recruitmentService.findAll();
  }

  @Get()
  findAllByRecruiter(@GetUser() recruiter: Recruiter): Promise<Recruitment[]> {
    this.logger.verbose(
      `Recruiter ${recruiter.companyName} is trying to get all recruitments`,
    );
    return this.recruitmentService.findAllByRecruiter(recruiter);
  }

  @Post()
  createRecruitment(
    @Body() createRecruitmentDto: CreateRecruitmentDto,
    @GetUser() recruiter: Recruiter,
  ): Promise<Recruitment> {
    this.logger.verbose(
      `Recruiter ${
        recruiter.companyName
      } is creating recruitment with payload: ${JSON.stringify(
        createRecruitmentDto,
      )}`,
    );
    return this.recruitmentService.createRecruitment(
      createRecruitmentDto,
      recruiter,
    );
  }

  @Delete(':id')
  deleteRecruitment(
    @Param('id') id: number,
    @GetUser() recruiter: Recruiter,
  ): Promise<void> {
    return this.recruitmentService.deleteRecruitment(id, recruiter);
  }
}
