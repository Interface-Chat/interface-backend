import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from '../entities/topic.entity';
import { UserToTopic } from 'src/modules/user_to_topic/entities/user_to_topic.entity';
import { CreateTopicDto } from '../dto/create-topic.dto';
import { UpdateTopicDto } from '../dto/update-topic.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    // private readonly userService: UsersService,
    // @InjectRepository(UserToTopic) // Inject the UserToTopic repository
    // private readonly userToTopicRepository: Repository<UserToTopic>,
  ) {}

  // async createWithUsers(createTopicDto: CreateTopicDto, userIds: number[]) {
  //   const topic = this.topicRepository.create(createTopicDto);
  //   const savedTopic = await this.topicRepository.save(topic);

  //   if (userIds && userIds.length > 0) {
  //     const users = await this.userService.findByIds(userIds);

  //     for (const user of users) {
  //       const userToTopic = new UserToTopic();
  //       userToTopic.user = user;
  //       userToTopic.topic = savedTopic;
  //       await this.userToTopicRepository.save(userToTopic);
  //     }
  //   }

  //   return savedTopic;
  // }  

  async create(createTopicDto: CreateTopicDto) {
    const topic = this.topicRepository.create(createTopicDto);
    return await this.topicRepository.save(topic);
  }

  async findAll() {
    return await this.topicRepository.find();
  }

  async findOne(id: number) {
    return await this.topicRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    await this.topicRepository.update(id, updateTopicDto);
    return await this.topicRepository.findOne({where: {id: id}});
  }

  async remove(id: number) {
    await this.topicRepository.delete(id);
    return { deleted: true };
  }
}
