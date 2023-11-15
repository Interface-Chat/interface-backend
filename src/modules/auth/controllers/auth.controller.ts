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
import { Roles } from 'src/modules/common/decorators/roles.decorator';
import { ERole } from 'src/modules/roles/role.enum';
import { RolesGuard } from '../guards/roles.guard';
// import { isFileExtensionSafe, removeFile, saveImageToStorage } from 'src/helpers/image_storage';
import { Observable, map, of, switchMap } from 'rxjs';
import { join } from 'path';
import { UploadFileService } from 'src/modules/uploadfile/services/upload_file.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private imageService: UploadFileService

  ) {}

    //Login
  @UseGuards(LocalAuthGuard)
  // @Roles(ERole.Teacher,ERole.Student)
  // @UseGuards(RolesGuard)
  @Post('login')
  async login(@Body() authloginDto: UserLoginDto) {
    console.log(authloginDto);
    
    return this.authService.login(authloginDto);
  }

  //Get profile
  @UseGuards(JwtAuthGuard)
  // @Roles(ERole.Teacher,ERole.Student)
  // @UseGuards(RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log(req.user);
    const displayName = req.user.payload.fullName ? `${req.user.payload.fullName} (${req.user.payload.username})` : req.user.payload.username;
    const responseData = { data: {...req.user.payload, displayName} };

  return responseData;
  }

  //update user this => call from authservice <= from userservice
  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Param('id') id: number,
    @Body() updateProfileAuth: UpdateAuth,
  ) {
    await this.authService.updateAuthInfo(id, updateProfileAuth);
    return 'updated';
  }


  //change password
  @UseGuards(JwtAuthGuard)
  @Roles(ERole.Teacher,ERole.Student,ERole.Staff)
  @Patch('change_password/:id')
  async changePassword(
    @Request() req,
    @Param('id') id: number,
    @Body() changePasswordDto: ChangePassWord,
  ) {
     id =req.user.id
    await this.authService.changePassword(+id, changePasswordDto);
    return 'changed';
  }
  ///upload image 
  // @UseGuards(JwtAuthGuard)
  // @Patch('Update_profile:id')
  // @UseInterceptors(FileInterceptor('image', multerConfig))
  // async uploadFile(
  //   @UploadedFile() image: Express.Multer.File,
  //   @Param('id') id: number,
  // ) {

  //   return { message: 'File uploaded and saved to the database successfully' };
  // }
  //uplaod image 
  @UseGuards(JwtAuthGuard)
  @Patch('upload/profile')
  async uploadImage(image:any){
    console.log(image);
    return await this.authService.uploadImage(image);
  }

  // file image 
  // @UseGuards(JwtAuthGuard)
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  // uploadImage(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Request() req,
  // ): Observable<{ modifiedFileName: string } | { error: string }> {
  //   const fileName = file?.filename;

  //   if (!fileName) return of({ error: 'File must be a png, jpg/jpeg' });

  //   const imagesFolderPath = join(process.cwd(), 'images');
  //   const fullImagePath = join(imagesFolderPath + '/' + file.filename);

  //   return isFileExtensionSafe(fullImagePath).pipe(
  //     switchMap((isFileLegit: boolean) => {
  //       if (isFileLegit) {
  //         const userId = req.user.id;
  //         return this.userService.updateUserImageById(userId, fileName).pipe(
  //           map(() => ({
  //             modifiedFileName: file.filename,
  //           })),
  //         );
  //       }
  //       removeFile(fullImagePath);
  //       return of({ error: 'File content does not match extension!' });
  //     }),
  //   );
  }
  

  // @UseGuards(JwtAuthGuard)
  // @Get('me')
  // async test(@Req() req: Request){
  //     // const user = await this.authService.getProfile({req.user})
  //     return req.user;
  // }
  //or use this method
  //   @UseGuards(LocalAuthGuard)
  //   ///auth/signin
  //   @Post('login')
  //   async login(@Request() req) {
  //     return this.authService.login(req.user);
  //     }


// }
