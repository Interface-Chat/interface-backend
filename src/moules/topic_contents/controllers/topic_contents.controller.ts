import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicContentsService } from '../services/topic_contents.service';
import { CreateTopicContentDto } from '../dto/create-topic_content.dto';
import { UpdateTopicContentDto } from '../dto/update-topic_content.dto';

@Controller('topic-contents')
export class TopicContentsController {
  constructor(private readonly topicContentsService: TopicContentsService) {}

  @Post()
  create(@Body() createTopicContentDto: CreateTopicContentDto) {
    return this.topicContentsService.create(createTopicContentDto);
  }

  @Get()
  findAll() {
    return this.topicContentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicContentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicContentDto: UpdateTopicContentDto) {
    return this.topicContentsService.update(+id, updateTopicContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicContentsService.remove(+id);
  }
}
