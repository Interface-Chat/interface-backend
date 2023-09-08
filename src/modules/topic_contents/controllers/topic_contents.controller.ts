import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { TopicContentsService } from '../services/topic_contents.service';
import { CreateTopicContentDto } from '../dto/create-topic_content.dto';
import { UpdateTopicContentDto } from '../dto/update-topic_content.dto';
// import { AuthService } from 'src/modules/auth/services/auth.service';
// import { TopicsService } from 'src/modules/topics/services/topics.service';

@Controller('topic-contents')
export class TopicContentsController {
  constructor(
    private readonly topicContentsService: TopicContentsService,
    // private readonly authService: AuthService,
    // private readonly topicService: TopicsService,
  ) {}

  @Post()
  async create(@Body() createTopicContentDto: CreateTopicContentDto) {
    if (!createTopicContentDto.user || !createTopicContentDto.topic) {
      throw new BadRequestException('User and topic must be provided.');
    }
    return this.topicContentsService.create(createTopicContentDto);
  }

  // @Post()
  // async create(@Body() createTopicContentDto: CreateTopicContentDto) {
  //   const user = await this.authService.getCurrentUser(); // Get the authenticated user
  //   const topic = await this.topicService.findOne(createTopicContentDto.topicId); // Get the selected topic

  //   if (!user || !topic) {
  //     throw new NotFoundException('User or topic not found');
  //   }

  //   return this.topicContentsService.create(user, topic, createTopicContentDto);
  // }

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
