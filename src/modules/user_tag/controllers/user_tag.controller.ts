import { Controller, Get, Post, Body, Patch, Param, Delete, Request,UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserTagService } from '../services/user_tag.service';
import { CreateUserTagDto } from '../dto/create-user_tag.dto';
import { UserTag } from '../entities/user_tag.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { log } from 'console';
import { Roles } from 'src/modules/common/decorators/roles.decorator';
import { ERole } from 'src/modules/roles/role.enum';
// import { UpdateUserTagDto } from '../dto/update-user_tag.dto';

@Controller('usertag')
export class UserTagController {
  constructor(private readonly userTagService: UserTagService) {}



  
  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseGuards(JwtAuthGuard)
  // @Post('create')
  // async createUser(
  // @Body()tagUserDto:CreateUserTagDto,
  // @Request() req

  // ){
  //   console.log(tagUserDto)
  //    tagUserDto.userid = req.user.id;
  //    const userTag=await this.userTagService.createUserTag(tagUserDto);
  //    return userTag;
  
  // }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  async createUser(
  @Body()tagUserDto:CreateUserTagDto,
  ){
    console.log(tagUserDto)
     const userTag=await this.userTagService.createUserTag(tagUserDto);

      console.log(userTag);
      
     return userTag;
  
  }

  @Get('list')
  async listUsertag(){
    return await this.userTagService.findUserTag();
  }

  @UseGuards(JwtAuthGuard)
  @Get('auser')
  async selectAUser(@Request() req){
    return await this.userTagService.selectAUser(req.user.id);

  }


  // Get all user by tag
  @UseGuards(JwtAuthGuard)
  @Roles(ERole.Admin)
  @Get(':name')
  async getUserBytag(@Param('name')name:string){
    console.log(name);
    return await this.userTagService.selectBytag(name);
  }
}
