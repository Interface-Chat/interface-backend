import { Module } from '@nestjs/common';
import { TopicsService } from './services/topics.service';
import { TopicsController } from './controllers/topics.controller';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}
