import { UserToTopic } from 'src/modules/user_to_topic/entities/user_to_topic.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { TopicContent } from 'src/modules/topic_contents/entities/topic_content.entity';

@Entity({name: 'topics'})
export class Topic {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  topic_profile_img: string;

  @OneToMany(() => UserToTopic, (userToTopic) => userToTopic.topic)
  userToTopics: UserToTopic[];

  @OneToMany(() => TopicContent, (topicContent) => topicContent.topic)
  contentToTopic: TopicContent[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
