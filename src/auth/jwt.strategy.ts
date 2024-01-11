import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { SignUpRecruiterDto } from "./dto/signUp-recruiter.dto";
import { RecruiterService } from "./recruiter.service";
import { Constant } from "../../auth.constant";
import { Recruiter } from "./recruiter.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy){
    constructor(
        private recruiterService: RecruiterService
    ){
        super({
            secretOrKey: Constant.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload){
        const {businessId} = payload;
        const recruiter: Recruiter = await this.recruiterService.findOne(businessId);

        if(!recruiter) {
            throw new UnauthorizedException();
        }

        return recruiter;
    }
}