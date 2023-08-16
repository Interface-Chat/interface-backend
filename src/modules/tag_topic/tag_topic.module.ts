import { Module } from '@nestjs/common';
import { TagTopicService } from './services/tag_topic.service';
import { TagTopicController } from './controllers/tag_topic.controller';

@Module({
  controllers: [TagTopicController],
  providers: [TagTopicService],
})
export class TagTopicModule {}
