import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { CreaetUserType } from 'src/utils/types';
import { UpdateUserType } from 'src/utils/update_type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


   //create one user
   @Post(`create`)
   createUser(@Body() createUserDto:CreateUserDto): Promise<User> {
     return this.usersService.createUser(createUserDto);
   }

//list many users 
  @Get('list')
  async getUser(){
    const user = await this.usersService.findUsers();
    return user;
  }
  @Get('search/:username')
  async getOneUser(@Param('username')username:string,
  @Body()findUser:CreaetUserType,
  ){
    return this.usersService.findOneUser(username);
    
  }
  @Get('id')
  async getUserbyID(@Param('id')id:string,
  @Body()findUser:CreaetUserType,
  ){
    return this.usersService.findUserByID(id);
    
  }

  //Update User Information 
  @Patch('updateinfo/:username')
  async updateUserInfo(@Param('username')username:string,
  @Body()updateInfo:UpdateUserType,
  ) 
  {
   await this.usersService.updateUsersInfo(username , updateInfo); 
  }


//deletep a user
@Delete('delete/:username')
async deleteUser(@Param('username')username:string)
{
 await this.usersService.deleteUser(username)
}
  
}
