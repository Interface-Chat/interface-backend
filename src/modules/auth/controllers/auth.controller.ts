import { Controller,Post,Body,Patch, Param } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dtos/user_login.dto';
import { UpdateUserType } from 'src/utils/update_type';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){

    }

    @Post('login')
    async login(@Body()authloginDto:UserLoginDto){
        return this.authService.login(authloginDto);
    }

    // Stay in login 
    @Patch(':username/resetpassword')
    async resetpassword(
        @Param('username')username:string,
        @Body() resetPassword:UpdateUserType,
    ){
        await this.authService.resetPassword(resetPassword)
    }

}
