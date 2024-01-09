import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RecruiterService } from 'src/recruiter/recruiter.service';

@Injectable()
export class AuthService {
    constructor(private recruiterService: RecruiterService,
        private jwtService: JwtService) {}

    async signIn(recruiterName: string, pw: string): Promise<any>{
        const recruiter = await this.recruiterService.findOne(recruiterName);
        if(recruiter?.password !== pw){
            throw new UnauthorizedException();
        }
        const payload = { sub: recruiter.id, businessId: recruiter.businessId};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
