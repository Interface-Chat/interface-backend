import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TagsService } from '../services/tags.service';
import { CreateTagDto } from '../dto/create-tag.dto';
import { ERole } from 'src/modules/roles/role.enum';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Roles } from 'src/modules/common/decorators/roles.decorator';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(ERole.Admin)
  @Post('create')
  createTag(@Body()tagDto:CreateTagDto){
    return this.tagsService.createTag(tagDto);

  }

  
  // @Post('create')
  // create(@Body() createTagDto: CreateTagDto) {
  //   return this.tagsService.createTag(createTagDto);
  // }

 
}
