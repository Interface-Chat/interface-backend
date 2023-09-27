import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Get,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
  ForbiddenException,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dtos/user_login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ChangePassWord } from '../dtos/password_reset.dto';
import { UpdateAuth } from '../dtos/updateAuth.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { multerConfig } from 'src/configs/multer.config';
import { Roles } from 'src/modules/common/decorators/roles.decorator';
import { ERole } from 'src/modules/roles/role.enum';
import { RolesGuard } from '../guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() authloginDto: UserLoginDto) {
    // console.log(authloginDto);
    
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
  @Roles(ERole.Teacher)
  @UseGuards(RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  async getProfile(@Request() req) {
    // const user = await this.authService.getProfile(req.user);
    return req.user;
  }

  //update user
  @Patch('update/:username')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Param('username') username: string,
    @Body() updateProfileAuth: UpdateAuth,
  ) {
    await this.userService.updateUsersInfo(username, updateProfileAuth);
    return 'updated';
  }
  //change password
  @UseGuards(JwtAuthGuard)
  @Patch('change_password/:id')
  async changePassword(
    @Param('id') id: number,

    @Body() changePasswordDto: ChangePassWord,
  ) {
    await this.authService.changePassword(+id, changePasswordDto);
    return 'changed';
  }
  @UseGuards(JwtAuthGuard)
  @Patch('Update_profile:id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadFile(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: number,
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
