import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { Recruiter } from 'src/entities/recruiter.entity';
import { CreateRecruiterDto } from 'src/dto/create-recruiter.dto';
import { UpdateRecruiterDto } from 'src/dto/update-recruiter.dto';

@Controller('recruiter')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Get()
  findAll(): Promise<Recruiter[]> {
    return this.recruiterService.findAll();
  }



  @Post()
  create(@Body() createRecruiterDto: CreateRecruiterDto): Promise<void> {
    return this.recruiterService.createRecruiter(createRecruiterDto);
  }

  @Patch(':id')
  update(@Param('id') id:number , @Body() updateRecruiterDto: UpdateRecruiterDto): Promise<void>{
    return this.recruiterService.updateRecruiter(id, updateRecruiterDto);
  }
}
