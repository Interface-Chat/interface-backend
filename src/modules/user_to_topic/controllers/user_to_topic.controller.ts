// user_to_topic.controller.ts
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UserToTopicService } from '../services/user_to_topic.service';
import { CreateUserToTopicDto } from '../dto/create-user_to_topic.dto';

@Controller('user-to-topic')
export class UserToTopicController {
  constructor(private readonly userToTopicService: UserToTopicService) {}

  @Post()
  async create(@Body() createUserToTopicDto: CreateUserToTopicDto) {
    return this.userToTopicService.create(createUserToTopicDto);
  }

  @Get()
  findAll() {
    return this.userToTopicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userToTopicService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userToTopicService.remove(+id);
  }
}
