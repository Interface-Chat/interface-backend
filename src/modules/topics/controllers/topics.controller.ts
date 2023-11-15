import { Controller, Get, Post, Body, Put, Param, Delete, BadRequestException, Headers, Request, UseGuards } from '@nestjs/common';
import { TopicsService } from '../services/topics.service';
import { CreateTopicDto } from '../dto/create-topic.dto';
import { UpdateTopicDto } from '../dto/update-topic.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
// import {Request} from 'express'

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post("create")
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
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
