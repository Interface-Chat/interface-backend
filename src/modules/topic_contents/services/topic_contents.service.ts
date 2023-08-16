import { Injectable } from '@nestjs/common';
import { CreateTopicContentDto } from '../dto/create-topic_content.dto';
import { UpdateTopicContentDto } from '../dto/update-topic_content.dto';

@Injectable()
export class TopicContentsService {
  create(createTopicContentDto: CreateTopicContentDto) {
    return 'This action adds a new topicContent';
  }

  findAll() {
    return `This action returns all topicContents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicContent`;
  }

  update(id: number, updateTopicContentDto: UpdateTopicContentDto) {
    return `This action updates a #${id} topicContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} topicContent`;
  }
}
