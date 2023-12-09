import { Module } from '@nestjs/common';
import { TagTopicService } from './services/tag_topic.service';
import { TagTopicController } from './controllers/tag_topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagTopic } from './entities/tag_topic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagTopic])
  ],
  controllers: [TagTopicController],
  providers: [TagTopicService],
  exports: [TagTopicService]
})
export class TagTopicModule {}
