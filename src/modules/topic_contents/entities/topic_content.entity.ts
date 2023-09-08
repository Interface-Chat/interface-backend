import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { User } from 'src/modules/users/entities/user.entity';

// import { UserToTopic } from 'src/modules/user_to_topic/entities/user_to_topic.entity';

@Entity({name: 'topic_contents'})
export class TopicContent {
    @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Topic, (topic) => topic.contentToTopic)
  // topic: Topic;

  // @ManyToOne(() => UserToTopic, (userToTopic) => userToTopic.user)
  // user: UserToTopic;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Topic)
  topic: Topic;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  attach: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
