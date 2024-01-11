import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Recruiter } from './recruiter.entity';
import { SignUpRecruiterDto } from './dto/signUp-recruiter.dto';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class RecruiterService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async createRecruiter(signUpRecruiterDto: SignUpRecruiterDto): Promise<void>{
    const { businessId, password, managerName, companyName} = signUpRecruiterDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const recruiter =  this.entityManager.create(Recruiter, {businessId, password: hashedPassword, managerName, companyName});
    try{
      await this.entityManager.save(recruiter);
    }catch(error){ 
      if(error.code === '23505'){
        throw new ConflictException("Existing BusinessId");
      } else{ 
        throw new InternalServerErrorException();
      }
    }
  }

  async findOne(businessId: string): Promise<Recruiter>{
    return this.entityManager.findOne(Recruiter, {
      where: {businessId: businessId}
    })
  }


}
