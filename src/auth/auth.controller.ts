import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRecruiterDto } from './dto/signUp-recruiter.dto';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { Recruiter } from './recruiter/recruiter.entity';
import { SignUpApplierDto } from './dto/signUp-applier.dto';
import { Applier } from './applier/applier.entity';
import { ShowApplierDto } from './dto/showApplier.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('recruiter/signup')
  signUpRecruiter(
    @Body() signUpRecruiterDto: SignUpRecruiterDto,
  ): Promise<void> {
    return this.authService.signUpRecruiter(signUpRecruiterDto);
  }

  // @Post('recruiter/signin')
  // signInRecruiter(
  //   @Body() signInDto: SignInDto,
  // ): Promise<{ accessToken: string }> {
  //   return this.authService.signInRecruiter(signInDto);
  // }

  //localStrategy 방식으로 테스트 중
  @Post('recruiter/signin')
  @UseGuards(AuthGuard('local'))
  async signInRecruiterTest(@Request() req): Promise<any> {
    return await this.authService.signInRecruiterTest(req.user);
  }

  @Post('recruiter/refresh')
  @UseGuards(AuthGuard('refresh'))
  async refreshToken(@GetUser() recruiter: Recruiter) {
    const accessToken = await this.authService.createAccessToken(recruiter);
    return { accessToken, recruiter };
  }

  // @Post('recruiter/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() recruiter: Recruiter) {
  //   console.log('recruiter', recruiter);
  // }

  // @Get('applier/masterget')
  // @UseGuards(AuthGuard())
  // findAll(): Promise<Applier[]> {
  //   return this.authService.findAllApplier();
  // }

  // @Get('recruiter/masterget')
  // @UseGuards(AuthGuard())
  // findAllRecruiter(): Promise<Recruiter[]> {
  //   return this.authService.findAllRecruiter();
  // }

  @Post('applier/signup')
  signUpApplier(@Body() signUpApplierDto: SignUpApplierDto): Promise<void> {
    return this.authService.signUpApplier(signUpApplierDto);
  }

  @Post('applier/signin')
  signInApplier(
    @Body() signInDto: SignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signInApplier(signInDto);
  }

  // @Get('applier/:businessId')
  // @UseGuards(AuthGuard())
  // async findApplier(
  //   @Param('businessId') businessId: string,
  // ): Promise<ShowApplierDto> {
  //   const result = await this.authService.findApplier(businessId);
  //   console.log(result);
  //   return result;
  // }
}
