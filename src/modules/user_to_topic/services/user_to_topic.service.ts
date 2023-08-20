import { Injectable } from '@nestjs/common';
import { CreateUserToTopicDto } from '../dto/create-user_to_topic.dto';
import { UpdateUserToTopicDto } from '../dto/update-user_to_topic.dto';

@Injectable()
export class UserToTopicService {
  create(createUserToTopicDto: CreateUserToTopicDto) {
    return 'This action adds a new userToTopic';
  }

  findAll() {
    return `This action returns all userToTopic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userToTopic`;
  }

  update(id: number, updateUserToTopicDto: UpdateUserToTopicDto) {
    return `This action updates a #${id} userToTopic`;
  }

  remove(id: number) {
    return `This action removes a #${id} userToTopic`;
  }
}
