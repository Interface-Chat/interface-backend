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
import { LocalAuthGuard } from 'src/modules/auth/guards/local-auth.guard';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Roles } from 'src/modules/common/decorators/roles.decorator';
import { Role } from 'src/modules/roles/entities/role.entity';
import { ERole } from 'src/modules/roles/role.enum';
// import { RoleDto } from 'src/modules/roles/dtos/roles.dto';
  
  
  @Controller('admin')
  export class AdminController {
    constructor(
      private readonly usersService: UsersService,
    ) {}
  
    //CREATE
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.Admin)
    @Post(`create`)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      const createuser = await this.usersService.createUser(createUserDto);
      return createuser;
    }
    
  
    //update
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.Admin)
    @Patch('updateUser/:id')
    async adminUpdateUser(
      @Param('id')id:number,
      @Body()adminUpdateUser:AdminUpdateUserDto){
        await this.usersService.updateUserByAdmin(+id,adminUpdateUser);
        return 'Updated';
  
      }
   
  
    //list many users
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.Admin)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('list')
    async getUser() {
      const user = await this.usersService.findUsers();
      return user;
    }

    //search
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.Admin)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async findall(@Paginate() query: PaginateQuery):Promise<Paginated<User>>{
      return this.usersService.search(query);
    }
  
    // find a user by username
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.Admin)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('search/:username')
    async getOneUser(@Param('username') username: string) {
      const getUser = this.usersService.findOneUser(username);
      return getUser;
    }

    

    //admin need to input to find a user
    @UseGuards(JwtAuthGuard)
    @Roles(ERole.Admin)
    @Get(':id')
    async getUserbyID(
      @Param('id', ParseIntPipe) id: number,
      // @Body() findUser: CreateUserDto,
    ) {
      return this.usersService.findUserByID(+id);
    }
  
    //Update User Information
    // @UseGuards(JwtAuthGuard)
    // @Roles(ERole.Admin)
    // @Patch('updateinfo/:id')
    // async updateUserInfo(
    //   @Param('id') id: number,
    //   @Body() updateInfo: UpdateUserDto,
    //   // @Request() req
    // ) {
    //   await this.usersService.updateUsersInfo(id, updateInfo);
    //   return 'updated';
    // }
  
    //deletep a user
    @Roles(ERole.Admin)
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:username')
    async deleteUser(@Param('username') username: string) {
      await this.usersService.deleteUserByusername(username);
    }
    //ge
  }
  