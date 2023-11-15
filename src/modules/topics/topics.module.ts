import { Module } from '@nestjs/common';
import { TopicsService } from './services/topics.service';
import { TopicsController } from './controllers/topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { JwtService } from '@nestjs/jwt';
import { UserToTopicModule } from '../user_to_topic/user_to_topic.module';
import { TagTopicModule } from '../tag_topic/tag_topic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
    UserToTopicModule,
    TagTopicModule,
  ],
  controllers: [TopicsController],
  providers: [TopicsService, JwtService],
  exports:[TopicsService],
})
export class TopicsModule {}
