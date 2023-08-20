import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserToTopicService } from '../services/user_to_topic.service';
import { CreateUserToTopicDto } from '../dto/create-user_to_topic.dto';
import { UpdateUserToTopicDto } from '../dto/update-user_to_topic.dto';

@Controller('user-to-topic')
export class UserToTopicController {
  constructor(private readonly userToTopicService: UserToTopicService) {}

  @Post()
  create(@Body() createUserToTopicDto: CreateUserToTopicDto) {
    return this.userToTopicService.create(createUserToTopicDto);
  }

  @Get()
  findAll() {
    return this.userToTopicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userToTopicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserToTopicDto: UpdateUserToTopicDto) {
    return this.userToTopicService.update(+id, updateUserToTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userToTopicService.remove(+id);
  }
}
