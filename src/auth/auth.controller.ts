import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRecruiterDto } from './dto/signUp-recruiter.dto';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { Recruiter } from './recruiter.entity';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @Post('signup')
    signUp(@Body() signUpRecruiterDto: SignUpRecruiterDto): Promise<void>{
        return this.authService.signUp(signUpRecruiterDto);
    }

    @Post('signin')
    signIn(@Body() signInDto: SignInDto): Promise<{accessToken: string}>{
        return this.authService.signIn(signInDto);
    }

    @Post('test')
    @UseGuards(AuthGuard())
    test(@GetUser() recruiter: Recruiter){
        console.log('recruiter', recruiter);
    }
}
