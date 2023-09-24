import { Controller,Post,Body,Patch, Param, UseGuards, Get,Request, ClassSerializerInterceptor, UseInterceptors, ForbiddenException, UploadedFile} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dtos/user_login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ChangePassWord } from '../dtos/password_reset.dto';
import { UpdateAuth } from '../dtos/updateAuth.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { multerConfig } from 'src/configs/multer.config';
import path from 'path';
import { Role } from 'src/modules/roles/entities/role.entity';
import { ERole } from 'src/modules/roles/role.enum';
import { Roles } from 'src/modules/roles/roles.decorator';
import { RolesGuard } from 'src/modules/roles/roles.guard';

// import { PassWord } from '../dtos/password_reset.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService,private readonly userService:UsersService){

    }
    @UseGuards(LocalAuthGuard)
    // @Role(ERole.Admin)
    // @Roles(ERole.Admin)
    // @UseGuards(RolesGuard)
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
    @UseGuards()
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('profile')
    async getProfile(
        @Request() req
        ) {
    // const user = await this.authService.getProfile(req.user);
    return req.user;
    }

    //update user
    @Patch('update/:username')
    @UseGuards(JwtAuthGuard)
    async updateProfile (@Param('username')username:string,
    @Body()updateProfileAuth:UpdateAuth,

    ){
        await this.userService.updateUsersInfo(username,updateProfileAuth)
      return 'updated'
    }
    //change password   
    @UseGuards(JwtAuthGuard)
    @Post('changepassword/:username')
    async changePassword(
        @Param('username')username:string,
       
        @Body() changePasswordDto: ChangePassWord,
    ){
       
        await this.authService.changePassword(username,changePasswordDto);
        return 'changed';
        
        
    }
    @UseGuards(JwtAuthGuard)
    @Patch('Update_profile:id')
    @UseInterceptors(FileInterceptor('image', multerConfig))
    async uploadFile(@UploadedFile() image: Express.Multer.File,
        @Param('id')id:number,
    ) {
        // const newImage = new Image();
        // this.userService.updateProfile_img(id);
 
        //      await this..save(newImage);
 
         return { message: 'File uploaded and saved to the database successfully' };
    }


    // @UseGuards(JwtAuthGuard)
    // @Get('me')
    // async test(@Req() req: Request){
    //     // const user = await this.authService.getProfile({req.user})
    //     return req.user;
    // }
}
