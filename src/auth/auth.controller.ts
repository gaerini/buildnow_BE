import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRecruiterDto } from './dto/signUp-recruiter.dto';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { Recruiter } from './recruiter/recruiter.entity';
import { SignUpApplierDto } from './dto/signUp-applier.dto';
import { Applier } from './applier/applier.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('recruiter/signup')
  signUpRecruiter(@Body() signUpRecruiterDto: SignUpRecruiterDto): Promise<void> {
    return this.authService.signUpRecruiter(signUpRecruiterDto);
  }

  @Post('recruiter/signin')
  signInRecruiter(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signInRecruiter(signInDto);
  }

  @Post('recruiter/test')
  @UseGuards(AuthGuard())
  test(@GetUser() recruiter: Recruiter) {
    console.log('recruiter', recruiter);
  }

  @Get('applier/masterget')
  findAll():Promise<Applier[]>{
    return this.authService.findAllApplier();
  }

  @Post('applier/signup')
  signUpApplier(@Body() signUpApplierDto: SignUpApplierDto): Promise<void>{
    return this.authService.signUpApplier(signUpApplierDto);
  }

  @Post('applier/signin')
  signInApplier(@Body() signInDto:SignInDto): Promise<{accessToken:string}>{
    return this.authService.signInApplier(signInDto);
  }
}
