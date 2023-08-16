import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagTopicService } from '../services/tag_topic.service';
import { CreateTagTopicDto } from '../dto/create-tag_topic.dto';
import { UpdateTagTopicDto } from '../dto/update-tag_topic.dto';

@Controller('tag-topic')
export class TagTopicController {
  constructor(private readonly tagTopicService: TagTopicService) {}

  @Post()
  create(@Body() createTagTopicDto: CreateTagTopicDto) {
    return this.tagTopicService.create(createTagTopicDto);
  }

  @Get()
  findAll() {
    return this.tagTopicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagTopicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagTopicDto: UpdateTagTopicDto) {
    return this.tagTopicService.update(+id, updateTagTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagTopicService.remove(+id);
  }
}
