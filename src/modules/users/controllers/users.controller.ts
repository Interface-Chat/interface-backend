import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { RoleService } from 'src/modules/roles/services/role.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreaetUserType } from 'src/utils/types';
import { AdminUpdateUserDto } from '../dto/AdminUpdate.dto';
import { UploadFileService } from 'src/modules/uploadfile/services/upload_file.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
        // private readonly roleService: RoleService,
  ) {}


  @Patch('profile/upload/:id')
  async uploadProfile(
  @Param('id')id:number,
    @Body()img:any)
  {
    return await this.usersService.uploadImage(+id,img)
    
  }

  // @Post('create')
  // async createUser(
  //   @Body()CreateUserDto:CreateUserDto,role:string
  // )
  // {
  //   const createUser = await this.usersService.createUser(CreateUserDto,role)
  //   return createUser;
  // }
  @Post(`create`)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const createuser = await this.usersService.createUser(createUserDto);
    return createuser;
  }

  //update
  @Patch('updateUser/:id')
  async adminUpdateUser(
    @Param('id')id:number,
    @Body()adminUpdateUser:AdminUpdateUserDto){
      await this.usersService.updateUserByAdmin(+id,adminUpdateUser);
      return 'Updated';

    }
 

  //list many users
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  async getUser() {
    const user = await this.usersService.findUsers();
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('search/:username')
  async getOneUser(@Param('username') username: string) {
    const getUser = this.usersService.findOneUser(username);
    return getUser;
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUserbyID(
    @Param('id', ParseIntPipe) id: number,
    @Body() findUser: CreaetUserType,
  ) {
    return this.usersService.findUserByID(+id);
  }

  //Select Admin
  

  //Update User Information
  @UseGuards(JwtAuthGuard)
  // @UseInterceptors(ClassSerializerInterceptor)
  @Patch('updateinfo/:username')
  async updateUserInfo(
    @Param('username') username: string,
    @Body() updateInfo: UpdateUserDto,
  ) {
    await this.usersService.updateUsersInfo(username, updateInfo);
    return 'updated';
  }

  //deletep a user
  @Delete('delete/:username')
  async deleteUser(@Param('username') username: string) {
    await this.usersService.deleteUser(username);
  }
}
