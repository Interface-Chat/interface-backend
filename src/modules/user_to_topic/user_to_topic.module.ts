import { Module } from '@nestjs/common';
import { UserToTopicService } from './services/user_to_topic.service';
import { UserToTopicController } from './controllers/user_to_topic.controller';
import { UserToTopic } from './entities/user_to_topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserToTopic])
  ],
  controllers: [UserToTopicController],
  providers: [UserToTopicService],
  exports: [UserToTopicService],
})
export class UserToTopicModule {}
