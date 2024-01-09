import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Recruiter } from '../entities/recruiter.entity';
import { CreateRecruiterDto } from 'src/dto/create-recruiter.dto';
import { UpdateRecruiterDto } from 'src/dto/update-recruiter.dto';

@Injectable()
export class RecruiterService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  findAll(): Promise<Recruiter[]> {
    return this.entityManager.find(Recruiter);
  }

  findOne(recruiterName: string): Promise<Recruiter | null> {
    return this.entityManager.findOne(Recruiter, {
      where: {
        businessId: recruiterName,
      },
    });
  }
  
  async deleteRecruiter(id:number): Promise<void> {
    await this.entityManager.delete(Recruiter, id);
  }

  async createRecruiter(createRecruiterDto: CreateRecruiterDto): Promise<void> {
    await this.entityManager.save(Recruiter, createRecruiterDto);
  }

  async updateRecruiter(id:number, updateRecruiterDto: UpdateRecruiterDto): Promise<void> {
    await this.entityManager.update(Recruiter, id, updateRecruiterDto);
  }

}
