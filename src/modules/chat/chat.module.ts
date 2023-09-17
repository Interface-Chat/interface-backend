import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { ChatService } from './services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicContent } from '../topic_contents/entities/topic_content.entity';
import { TopicContentsService } from '../topic_contents/services/topic_contents.service';
import { ChatSubscriptionsService } from './services/chat-subscriptions.service';
import { Topic } from '../topics/entities/topic.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicContent]),
    TypeOrmModule.forFeature([Topic]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [ChatGateway, ChatService, TopicContentsService, ChatSubscriptionsService]
})
export class ChatModule {}
