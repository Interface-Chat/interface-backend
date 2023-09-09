// chat.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicContent } from 'src/modules/topic_contents/entities/topic_content.entity';
import { CreateTopicContentDto } from 'src/modules/topic_contents/dto/create-topic_content.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(TopicContent)
    private chatMessageRepository: Repository<TopicContent>,
  ) {}

  async createMessage(createChatMessageDto: CreateTopicContentDto): Promise<TopicContent> {
    const message = this.chatMessageRepository.create(createChatMessageDto);
    return await this.chatMessageRepository.save(message);
  }

  async getMessagesByTopicContent(topicContentId: number): Promise<TopicContent[]> {
    return await this.chatMessageRepository.find({
      where: { topic: { id: topicContentId } },
      relations: ['user'],
    });
    
  }
}
