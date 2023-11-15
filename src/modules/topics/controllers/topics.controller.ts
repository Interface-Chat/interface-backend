import { Controller, Get, Post, Body, Put, Param, Delete, BadRequestException, Headers, Request, UseGuards } from '@nestjs/common';
import { TopicsService } from '../services/topics.service';
import { CreateTopicDto } from '../dto/create-topic.dto';
import { UpdateTopicDto } from '../dto/update-topic.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UserToTopicService } from 'src/modules/user_to_topic/services/user_to_topic.service';
import { TagTopicService } from 'src/modules/tag_topic/services/tag_topic.service';
// import {Request} from 'express'

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService,
    private readonly addToTopicService: UserToTopicService,
    private readonly addToTagService: TagTopicService) {}

  @Post("create")
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("user-create")
  async userCreate(@Body() createTopicDto: CreateTopicDto, @Request() req) {


    const topic = await this.topicsService.create(createTopicDto);
    createTopicDto.users.forEach(async user => {
      await this.addToTopicService.create({
        topic,
        user
      });
    });
    createTopicDto.tags.forEach(async tag => {
      await this.addToTagService.create({
        topic,
        tag
      });
    });
    await this.addToTopicService.create({
      topic,
      user: req.user.payload.id
    });

    return topic;

    
  }

  @Get()
  findAll() {
    return this.topicsService.findAll();
  }
  // @Get('listTopics')
  // async listTopics(@Headers('userId') userId: string) {
  //   return await this.topicsService.listTopicsOfUser(+userId)
  // }

  @Get('listTopicsByToken')
  async listTopicsByToken(@Headers('authorization') authorization: string) {
    return await this.topicsService.listTopicsByToken(authorization)
  }

  @UseGuards(JwtAuthGuard)
  @Get('listTopics')
  async listTopics(@Request() req) {
    console.log(req.user);
    
    const topics = await this.topicsService.listTopicsOfUser(req.user.payload.id);

    return topics;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.update(+id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(+id);
  }
}
