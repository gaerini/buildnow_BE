import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RecruiterService } from './recruiter/recruiter.service';
import { SignUpRecruiterDto } from './dto/signUp-recruiter.dto';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';
import { Recruiter } from './recruiter/recruiter.entity';
import * as bcrypt from 'bcryptjs';
import { SignUpApplierDto } from './dto/signUp-applier.dto';
import { ApplierService } from './applier/applier.service';
import { Applier } from './applier/applier.entity';
import { ShowApplierDto } from './dto/showApplier.dto';
@Injectable()
export class AuthService {
  constructor(
    private applierService: ApplierService,
    private recruiterService: RecruiterService,
    private jwtService: JwtService,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async signUpRecruiter(signUpRecruiterDto: SignUpRecruiterDto): Promise<void> {
    return this.recruiterService.createRecruiter(signUpRecruiterDto);
  }

  async signInRecruiter(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string }> {
    const { businessId, password } = signInDto;
    const recruiter = await this.recruiterService.findOne(businessId);

    if (recruiter && (await bcrypt.compare(password, recruiter.password))) {
      //creat user token
      const payload = { businessId, userType: 'recruiter' }; //user type을 지정함으로써 recruiter와 applier의 로그인 시 각각에 대한 jwt 발급을 관리할 수 있다.
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Login Failed');
    }
  }

  findAllApplier(): Promise<Applier[]> {
    return this.applierService.findAll();
  }

  async signUpApplier(signUpApplierDto: SignUpApplierDto): Promise<void> {
    return this.applierService.createApplier(signUpApplierDto);
  }

  async signInApplier(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { businessId, password } = signInDto;
    const applier = await this.dataSource.manager.findOneBy(Applier, {
      businessId: businessId,
    });

    if (applier && (await bcrypt.compare(password, applier.password))) {
      const payload = { businessId, userType: 'applier' };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Login Failed');
    }
  }

  findAllRecruiter(): Promise<Recruiter[]> {
    return this.recruiterService.findAll();
  }

  async findApplier(businessId: string): Promise<ShowApplierDto> {
    return await this.applierService.findOne(businessId);
  }
}
