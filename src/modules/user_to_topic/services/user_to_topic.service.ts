// user_to_topic.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserToTopic } from '../entities/user_to_topic.entity';
import { CreateUserToTopicDto } from '../dto/create-user_to_topic.dto';

@Injectable()
export class UserToTopicService {
  constructor(
    @InjectRepository(UserToTopic)
    private userToTopicRepository: Repository<UserToTopic>,
  ) {}

  async create(createUserToTopicDto: CreateUserToTopicDto): Promise<UserToTopic> {
    const userToTopic = new UserToTopic();
    // Map the properties from createUserToTopicDto to userToTopic
    userToTopic.user = createUserToTopicDto.user;
    userToTopic.topic = createUserToTopicDto.topic;

    return this.userToTopicRepository.save(userToTopic);
  }

  async remove(id: number) {
    await this.userToTopicRepository.delete(id);
    return { deleted: true };
  }

  async findAll() {
    return await this.userToTopicRepository.find();
  }

  async findOne(id: number): Promise<UserToTopic | undefined> {
    return this.userToTopicRepository.findOne({where: {id: id}});
  }
}
