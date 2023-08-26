import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from '../dtos/user_login.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { User } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PassWord } from '../dtos/password_reset.dto';


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
    async validateUser(userLoginDto: UserLoginDto): Promise<User> {
        const { email, password } = userLoginDto;

        const user = await this.usersService.findUserByEmail(email);
        // if(user && await user.validatePassword){
        //     return user;
        // }
        if (!(await user.validatePassword(password))) {
            throw new UnauthorizedException();
        }
        return user ;
    }


    //reset password

    async resetPassword(
        resetPassword:PassWord,
        ){
        // const resetPW = await this.login.apply(UserLoginDto)
        
        
        const {username , password } = resetPassword
        const auser = await this.usersService.findOneUser(username);

        // async verifyToken(token: string): Promise<boolean> {
        //     return this.resetTokensService.verifyToken(token);
        //   }
         
        
    }

}
