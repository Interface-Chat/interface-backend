import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Topic } from 'src/modules/topics/entities/topic.entity';

@Entity({name: 'topic_contents'})
export class TopicContent {
    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Topic, (topic) => topic.id)
  topic: Topic;

  @ManyToOne(() => Topic, (topic) => topic.users)
  user: Topic;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  attach: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
