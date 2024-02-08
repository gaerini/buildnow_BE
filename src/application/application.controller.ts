import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Application } from 'src/entities/application.entity';
import { ApplicationService } from './application.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Applier } from 'src/auth/applier/applier.entity';
import { NewApplicationDto } from './dto/newApplication.dto';
import { ScoreBoard } from 'src/entities/scoreBoard.entity';
import { NewScores } from './dto/newScores.dto';
import { UpdateScoresDto } from './dto/updateScores.dto';
import { Recruiter } from 'src/auth/recruiter/recruiter.entity';
import { Recruitment } from 'src/entities/recruitment.entity';

@Controller('application')
@UseGuards(AuthGuard())
export class ApplicationController {
  private logger = new Logger('application');

  constructor(private applicationService: ApplicationService) {}

  @Get('masterFindAll')
  findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Get('getMyApplicants')
  async findMyApplicants(
    @GetUser() recruiter: Recruiter,
  ): Promise<Application[]> {
    return await this.applicationService.findMyApplicants(recruiter);
  }

  @Get('getApplierInfo/:businessId')
  async applicantInfoByBusinessId(
    @GetUser() recruiter: Recruiter,
    @Param('businessId') businessId: string,
  ): Promise<any> {
    return await this.applicationService.applicantInfoByBusinessId(
      recruiter,
      businessId,
    );
  }

  @Post(':recruitmentId')
  async createApplicatoin(
    @Param('recruitmentId') recruitmentId: number,
    @GetUser() applier: Applier,
    @Body() newApplicationDto: NewApplicationDto,
  ): Promise<void> {
    await this.applicationService.applyToRecruitment(
      applier.id,
      recruitmentId,
      newApplicationDto,
    );
    this.logger.verbose(
      `${applier.companyName} applied to #${recruitmentId}recruitment`,
    );
    return;
  }

  //   @Get('getScores/:applicationId')
  //   async getScores(
  //     @Param('applicationId') applicationId: number,
  //   ): Promise<ScoreBoard[]> {
  //     const scoreList = await this.applicationService.findScores(applicationId);
  //     return scoreList;
  //   }

  //   @Post('insertScores/:applicationId')
  //   async insertScores(
  //     @Param('applicationId') applicationId: number,
  //     @Body() newScores: NewScores,
  //   ): Promise<void> {
  //     await this.applicationService.insertScores(applicationId, newScores);
  //     return;
  //   }

  //   @Patch('updateScores/:applicationId')
  //   async updateScores(
  //     @Param('applicationId') applicationId: number,
  //     @Body() updateScoresDto: UpdateScoresDto,
  //   ): Promise<void> {
  //     console.log(updateScoresDto);
  //     await this.applicationService.updateScores(applicationId, updateScoresDto);
  //     return;
  //   }
}
