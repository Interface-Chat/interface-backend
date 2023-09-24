import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from '../services/tags.service';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Post('create')
  createTag(@Body()tagDto:CreateTagDto){
     this.tagsService.createTag(tagDto);
    return 'Tag is Created';
  }
  // @Post('create')
  // create(@Body() createTagDto: CreateTagDto) {
  //   return this.tagsService.createTag(createTagDto);
  // }

 
}
