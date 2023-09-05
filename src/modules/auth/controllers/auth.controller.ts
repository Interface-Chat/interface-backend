import { Controller,Post,Body,Patch, Param, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dtos/user_login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {Request} from 'express'
// import { PassWord } from '../dtos/password_reset.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){

    }

    @Post('login')
    async login(@Body()authloginDto:UserLoginDto){
        return this.authService.login(authloginDto);
    }

    // Stay in login to change password
    // @UseGuards(JwtAuthGuard)
    // @Patch(':user_id/resetpassword')
    // async resetpassword(
    //     @Param('user_id')user_id:number,
    //     @Header('token')token:string,
    //     @Body() resetPassword:PassWord,
    // ){
    //     await this.authService.test(token);
    //     await this.authService.resetPassword
    // }


    @UseGuards(JwtAuthGuard)
    @Get('me')
    async test(@Req() req: Request){
        return req.user;
    }

}
