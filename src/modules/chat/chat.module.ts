import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { ChatService } from './services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicContent } from '../topic_contents/entities/topic_content.entity';
import { TopicContentsService } from '../topic_contents/services/topic_contents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicContent]),
  ],
  providers: [ChatGateway, ChatService, TopicContentsService]
})
export class ChatModule {}
