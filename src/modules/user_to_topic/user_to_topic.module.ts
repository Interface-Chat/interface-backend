import { Module } from '@nestjs/common';
import { UserToTopicService } from './services/user_to_topic.service';
import { UserToTopicController } from './controllers/user_to_topic.controller';

@Module({
  controllers: [UserToTopicController],
  providers: [UserToTopicService],
})
export class UserToTopicModule {}
