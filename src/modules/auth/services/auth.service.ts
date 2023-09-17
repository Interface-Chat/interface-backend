import { Injectable, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserLoginDto } from '../dtos/user_login.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { User } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ChangePassWordType, UserByIdType } from 'src/utils/types';




@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService:JwtService
    ) { }

    // async login(user:any) {
    //     // const user = await this.validateUser(authLoginDto);

    //     const payload = { userId: user.id};

    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }
    //***This return user ID  */
    async login(authLoginDto: UserLoginDto) {
        const user = await this.validateUser(authLoginDto);

        const payload = { userId: user.id};

        // let getToken = localStorage.getItem("token");
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

    //Get user Profile
    // @UseGuards(JwtAuthGuard)
    async getProfile(userByIdType:UserByIdType){
        const getuser = await this.usersService.findUserByID(userByIdType.id);
        return getuser;
    }
    

    async changePassword(userId:string,changePassword:ChangePassWordType){
        const {new_password , password} =changePassword;
        const user = await this.usersService.findUserByID(userId);
        // const currentPassword =await this.usersService.findUserPassword(password);
        if ((await user.validatePassword(password))){
            user.password = new_password;
            await user.save();
            

        }else if (!(await user.validatePassword(password))) {
            throw new UnauthorizedException();
        }
        // if (!(await user.validatePassword(password))) {
        //     throw new UnauthorizedException();
        // }
        // user.password = new_password;
        // return await user.save();
        
      
    }


} 
