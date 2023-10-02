import { Controller, Get, Post, Body, Patch, Param, Delete, Request,UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserTagService } from '../services/user_tag.service';
import { CreateUserTagDto } from '../dto/create-user_tag.dto';
import { UserTag } from '../entities/user_tag.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
// import { UpdateUserTagDto } from '../dto/update-user_tag.dto';

@Controller('usertag')
export class UserTagController {
  constructor(private readonly userTagService: UserTagService) {}



  
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createUser(
  @Body()tagUserDto:CreateUserTagDto,
  @Request() req

  ){
    console.log(tagUserDto)
     tagUserDto.userid = req.user.id;
     const userTag=await this.userTagService.createUserTag(tagUserDto);
     return userTag;
  
  }
}
