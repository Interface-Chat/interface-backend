import { Injectable, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserLoginDto } from '../dtos/user_login.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { User } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PassWord } from '../dtos/password_reset.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';


@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService:JwtService
    ) { }

    async login(authLoginDto: UserLoginDto) {
        const user = await this.validateUser(authLoginDto);

        const payload = {
            userId: user.id,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    //validateUser
    // async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    //     const { email, password } = userLoginDto;

    //     const user = await this.usersService.findUserByEmail(email);
    //     if (!(await user.validatePassword(password))) {
    //         throw new UnauthorizedException();
    //     }
    //     return user ;

    // }

    async validateUser(userLoginDto: UserLoginDto): Promise<User> {
        const { username, password } = userLoginDto;

        const user = await this.usersService.findUserByUsername(username);
        if (!(await user.validatePassword(password))) {
            throw new UnauthorizedException();
        }
        return user ;
    }

    // user
    // @UseGuards(JwtAuthGuard)
    // async test(@Req() req: Request){
    //     return req.user;
    // }

    //change password
    async changePassword(resetPassword:PassWord)
    {

    }
    

}
