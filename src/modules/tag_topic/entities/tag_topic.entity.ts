
import { Entity, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';


@Entity({name: 'tag_topic'})
export class TagTopic {
    @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => Tag, (tag) => tag.tagToTopics, { onDelete: 'CASCADE' })
  tag: Tag;

  @ManyToOne(() => Topic, (topic) => topic.tagToTopics)
  topic: Topic;
}

