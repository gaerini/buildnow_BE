import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
import { TokenDto } from './dto/token.dto';
@Injectable()
export class AuthService {
  constructor(
    private applierService: ApplierService,
    private recruiterService: RecruiterService,
    private jwtService: JwtService,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async refreshTokenMatches(refreshToken: string, recruiter: Recruiter) {
    if (refreshToken === recruiter.refreshToken) {
      delete recruiter.password;
      return recruiter;
    }
  }

  //local strategy에서 사용하는 id, pw 체크 함수
  async validateRecruiter(
    businessId: string,
    password: string,
  ): Promise<Recruiter> {
    const recruiter = await this.recruiterService.findOne(businessId);
    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!recruiter) {
      throw new UnauthorizedException('There is no businessId');
    } else if (recruiter && !isMatch) {
      throw new UnauthorizedException('password is incorrect');
    } else if (recruiter && isMatch) {
      return recruiter;
    } else {
      throw new BadRequestException('Bad Request for login');
    }
  }

  //local strategy에서 사용하는 함수로, 아이디와 비밀번호가 일치하면 access token과 refresh token을 반환
  async signInRecruiterTest(recruiter: Recruiter) {
    const tokenObj = await this.createToken(recruiter);
    await this.dataSource.manager.update(
      Recruiter,
      { id: recruiter.id },
      { lastLoginDate: new Date(), refreshToken: tokenObj.refreshToken },
    );

    return tokenObj;
  }

  async signUpRecruiter(signUpRecruiterDto: SignUpRecruiterDto): Promise<void> {
    return this.recruiterService.createRecruiter(signUpRecruiterDto);
  }

  //createAccessToken과 createRefreshToken 함수를 사용하여 해당 recruiter에 대한 토큰 쌍을 반환하는 함수
  async createToken(recruiter: Recruiter): Promise<TokenDto> {
    const tokenDto = new TokenDto(
      this.createAccessToken(recruiter),
      this.createRefreshToken(recruiter),
    );
    await this.dataSource.manager.update(
      Recruiter,
      { id: recruiter.id },
      { refreshToken: tokenDto.refreshToken },
    );
    return tokenDto;
  }

  createAccessToken(recruiter: Recruiter) {
    const payload = { businessId: recruiter.businessId, userType: 'recruiter' }; //user type을 지정함으로써 recruiter와 applier의 로그인 시 각각에 대한 jwt 발급을 관리할 수 있다.
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '30m',
    });
    return accessToken;
  }

  createRefreshToken(recruiter: Recruiter) {
    const payload = { businessId: recruiter.businessId, userType: 'recruiter' }; //user type을 지정함으로써 recruiter와 applier의 로그인 시 각각에 대한 jwt 발급을 관리할 수 있다.
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    return refreshToken;
  }

  async signInRecruiter(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string }> {
    const { businessId, password } = signInDto;

    const recruiter = await this.recruiterService.findOne(businessId);
    if (!recruiter) {
      throw new UnauthorizedException('There is no businessId');
    } else if (
      recruiter &&
      !(await bcrypt.compare(password, recruiter.password))
    ) {
      throw new UnauthorizedException('password is incorrect');
    } else if (
      recruiter &&
      (await bcrypt.compare(password, recruiter.password))
    ) {
      //creat user token
      const payload = { businessId, userType: 'recruiter' }; //user type을 지정함으로써 recruiter와 applier의 로그인 시 각각에 대한 jwt 발급을 관리할 수 있다.
      const accessToken = this.jwtService.sign(payload);

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
