// topic_contents.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicContent } from '../entities/topic_content.entity';
import { CreateTopicContentDto } from '../dto/create-topic_content.dto';
import { UpdateTopicContentDto } from '../dto/update-topic_content.dto';


@Injectable()
export class TopicContentsService {
  constructor(
    @InjectRepository(TopicContent)
    private topicContentRepository: Repository<TopicContent>,
  ) {}

  // async create(createTopicContentDto: CreateTopicContentDto): Promise<TopicContent> {
  //   const topicContent = this.topicContentRepository.create(createTopicContentDto);
  //   return await this.topicContentRepository.save(topicContent);
  // }

  async create(createTopicContentDto: CreateTopicContentDto): Promise<TopicContent> {
    const topicContent = new TopicContent();
    // const user = await this.usersService.findOne(createTopicContentDto.user);
    // const topic = await this.topicService.findOne(createTopicContentDto.topic);

    // const topicContent = this.topicContentRepository.create({
    //   ...rest,
    //   user,
    //   topic,
    // });
    topicContent.user = createTopicContentDto.user;
    topicContent.topic = createTopicContentDto.topic;

    if(createTopicContentDto.message){
      topicContent.message = createTopicContentDto.message;
    }

    if(createTopicContentDto.attach){
      topicContent.attach = createTopicContentDto.attach;
    }

    return this.topicContentRepository.save(topicContent);
  }

  // async create(user: User, topic: Topic, createTopicContentDto: CreateTopicContentDto): Promise<TopicContent> {
  //   const topicContent = this.topicContentRepository.create({
  //     ...createTopicContentDto,
  //     user,
  //     topic,
  //   });

  //   return await this.topicContentRepository.save(topicContent);
  // }

  async findAll() {
    return await this.topicContentRepository.find();
  }

  async findOne(id: number): Promise<TopicContent> {
    return this.topicContentRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateTopicContentDto: UpdateTopicContentDto): Promise<TopicContent> {
    await this.topicContentRepository.update(id, updateTopicContentDto);
    return this.topicContentRepository.findOne({where: {id: id}});
  }

  async remove(id: number) {
    await this.topicContentRepository.delete(id);
    return { deleted: true };
  }
}
