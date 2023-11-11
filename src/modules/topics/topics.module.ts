import { Module } from '@nestjs/common';
import { TopicsService } from './services/topics.service';
import { TopicsController } from './controllers/topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic])
  ],
  controllers: [TopicsController],
  providers: [TopicsService, JwtService],
  exports:[TopicsService],
})
export class TopicsModule {}
