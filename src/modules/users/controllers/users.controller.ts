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
  Request,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { RoleService } from 'src/modules/roles/services/role.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AdminUpdateUserDto } from '../dto/AdminUpdate.dto';
import { UploadFileService } from 'src/modules/uploadfile/services/upload_file.service';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
        // private readonly roleService: RoleService,
  ) {}

  @Post('createmany')
  async createManyUser(createManyUserDto:CreateUserDto[]):Promise<User[]>{
    console.log(createManyUserDto);
    
    return this.usersService.createMultipleUser(createManyUserDto);

  }
  
  //get search and sort
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findall(@Paginate() query: PaginateQuery):Promise<Paginated<User>>{
    return this.usersService.search(query);

  }

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

  //get a user by username
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('search/:username')
  async getOneUser(@Param('username') username: string) {
    const getUser = this.usersService.findOneUser(username);
    return getUser;
  }
  // get user by id 
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUserbyID(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.findUserByID(+id);
  }

  //Select Admin
  

  //Update User Information
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('updateinfo/:username')
  async updateUserInfo(
    @Param('id') id: number,
    @Body() updateInfo: UpdateUserDto,
    @Request() req
  ) {
    await this.usersService.updateUsersInfo(req.user.id, updateInfo);
    return 'updated';
  }


  //deletep a user
  @Delete('delete/:username')
  async deleteUser(@Param('username') username: string) {
    await this.usersService.deleteUserByusername(username);
  }
  
  

  
}
