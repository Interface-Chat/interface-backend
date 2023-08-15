import { Injectable } from '@nestjs/common';
import { CreateTagTopicDto } from '../dto/create-tag_topic.dto';
import { UpdateTagTopicDto } from '../dto/update-tag_topic.dto';

@Injectable()
export class TagTopicService {
  create(createTagTopicDto: CreateTagTopicDto) {
    return 'This action adds a new tagTopic';
  }

  findAll() {
    return `This action returns all tagTopic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tagTopic`;
  }

  update(id: number, updateTagTopicDto: UpdateTagTopicDto) {
    return `This action updates a #${id} tagTopic`;
  }

  remove(id: number) {
    return `This action removes a #${id} tagTopic`;
  }
}
