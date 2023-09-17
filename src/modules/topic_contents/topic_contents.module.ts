// topic_contents.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicContentsController } from './controllers/topic_contents.controller';
import { TopicContentsService } from './services/topic_contents.service';
import { TopicContent } from './entities/topic_content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopicContent])],
  controllers: [TopicContentsController],
  providers: [TopicContentsService],
})
export class TopicContentsModule {}
