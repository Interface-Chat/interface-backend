import { Injectable } from '@nestjs/common';
import { CreateTagTopicDto } from '../dto/create-tag_topic.dto';
import { UpdateTagTopicDto } from '../dto/update-tag_topic.dto';
import { Repository } from 'typeorm';
import { TagTopic } from '../entities/tag_topic.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagTopicService {
  constructor(
    @InjectRepository(TagTopic)
    private userToTopicRepository: Repository<TagTopic>,
  ) {}

  async create(createUserToTopicDto: CreateTagTopicDto): Promise<TagTopic> {
    const userToTopic = new TagTopic();
    
    userToTopic.tag = createUserToTopicDto.tag;
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

  async findOne(id: number): Promise<TagTopic | undefined> {
    return this.userToTopicRepository.findOne({where: {id: id}});
  }
}
