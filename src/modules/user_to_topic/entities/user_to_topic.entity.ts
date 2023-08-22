import { Entity, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';

@Entity({name: 'user_to_topic'})
export class UserToTopic {
    @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.id)
  topic: Topic;
}
