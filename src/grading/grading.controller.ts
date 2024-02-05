import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { InsertGradingDto } from './dto/insert-grading.dto';
import { GradingService } from './grading.service';

@Controller('grading')
export class GradingController {
  constructor(private readonly gradingService: GradingService) {}

  //   @Post(':recruitmentId')
  //   async insertGrading(
  //     @Param('recruitmentId') recruitmentId: number,
  //     @Body() insertGradingDto: InsertGradingDto,
  //   ): Promise<void> {
  //     this.gradingService.insertGrading(insertGradingDto, recruitmentId);
  //   }
}
