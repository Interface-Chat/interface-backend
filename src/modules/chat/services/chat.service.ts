import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicContent } from 'src/modules/topic_contents/entities/topic_content.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(TopicContent)
    private readonly chatRepository: Repository<TopicContent>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Topic)
    private readonly roomRepository: Repository<Topic>,
  ) {}

  // async getLatestUpdates(topicId: string): Promise<Topic[]> {
  //   // Assuming you have an 'Update' entity and a 'created_at' column
  //   return this.roomRepository.find({
  //     where: { topicId },
  //     order: { created_at: 'DESC' }, // Fetch updates in descending order of creation
  //     take: 10, // Adjust the number based on how many updates you want to retrieve
  //   });
  // }

  async saveMessage(topicId: any, id: any, message?: string, attach?: string): Promise<TopicContent> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    const topic = await this.roomRepository.findOne({ where: { id: topicId } });

    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }

    if (!topic) {
      console.log('Room not found');
      throw new Error('Room not found');
    }

    const chat = new TopicContent();
    chat.user = user;
    chat.topic = topic;
    if (attach) {
      chat.attach = attach;
    }
    if (message) {
      chat.message = message;
    }
    await this.chatRepository.save(chat);
    await this.roomRepository.update(topic.id, { updated_at: new Date() });
    // chat.user = chat.topic = null;
    return chat
  }

  async getChatHistory(topicId: any): Promise<TopicContent[]> {
      
    const topic = await this.roomRepository.findOne({ where: { id: topicId } });
    
    if (!topic) {
      console.log("room not found");
      
      throw new Error('Room not found');
    }

    return this.chatRepository.createQueryBuilder('tc')
      .where('tc.topic.id = :topicId', { topicId })
      .leftJoinAndSelect('tc.user', 'user')
      .leftJoinAndSelect('tc.topic', 'topic')
      .orderBy('tc.created_at', 'ASC')
      .getMany();
  }

}
