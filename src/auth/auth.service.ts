import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { SignUpRecruiterDto } from './dto/signUp-recruiter.dto';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Recruiter } from './recruiter.entity';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
    constructor(private recruiterService: RecruiterService,
        private jwtService: JwtService){}

    async signUp(signUpRecruiterDto: SignUpRecruiterDto): Promise<void>{
        return this.recruiterService.createRecruiter(signUpRecruiterDto);
    }

    async signIn(signInDto: SignInDto): Promise<{accessToken: string}>{
        const {businessId, password} = signInDto;
        const recruiter = await this.recruiterService.findOne(businessId);

        if(recruiter && (await bcrypt.compare(password, recruiter.password))){
            //creat user token
            const payload = { businessId };
            const accessToken = await this.jwtService.sign(payload);
            
            return {accessToken};
        }
        else{
        throw new UnauthorizedException("Login Failed");
        }
    }
}
