import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/services/users.service';
import { Validate } from 'class-validator';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    // UsersService: any;
    constructor(private readonly userService:UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    


    async validate(payload: any) {
    // async Validate (payload{userId: any }){
    
        const user = this.userService.findOneUser(payload.username);
        return user;
        // return {
        //     id: payload.userId,
        //     username: payload.username,
        //     mobile:payload.mobile,
        //     fullname:payload.fullName,
        
        // };
        
    }
    
    
}