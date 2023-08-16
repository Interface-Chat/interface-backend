import { Module } from '@nestjs/common';
import { TopicContentsService } from './services/topic_contents.service';
import { TopicContentsController } from './controllers/topic_contents.controller';

@Module({
  controllers: [TopicContentsController],
  providers: [TopicContentsService],
})
export class TopicContentsModule {}
