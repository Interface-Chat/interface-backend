import { Controller,Post,Body,Patch, Param, UseGuards, Get,Request} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dtos/user_login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import {Request} from 'express'
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ChangePassWord } from '../dtos/password_reset.dto';
// import { PassWord } from '../dtos/password_reset.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){

    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body()authloginDto:UserLoginDto){
        return this.authService.login(authloginDto);
    }

    //or use this method
    //   @UseGuards(LocalAuthGuard)
//   ///auth/signin
//   @Post('login')
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//     }

    @UseGuards(JwtAuthGuard)
    @Get('me/profile')
    async getProfile(
        @Request() req
        ) {
    // const user = await this.authService.getProfile(req.user);
    return req.user;
    }

    // @Patch('change_password')
    // async changePassword(
    //     @Request() req,
    //     @Body() changePassword:ChangePassWord,
    // ){}

    @UseGuards(JwtAuthGuard)
    @Post('changepassword')
    async changePassword(
        @Request()req,
        @Body() changePasswordDto: ChangePassWord,
    ){
        const user = req.user;
        await this.authService.changePassword(user,changePasswordDto);
        
    }


    // @UseGuards(JwtAuthGuard)
    // @Get('me')
    // async test(@Req() req: Request){
    //     // const user = await this.authService.getProfile({req.user})
    //     return req.user;
    // }

    

//   @UseGuards(JwtAuthGuard)
//   @Get('api/test/profile')
//   async getProfile(@Request() req) {
//     const user = await this.authService.getProfile(req.user.username);
//     return req.user;
//   }

}
