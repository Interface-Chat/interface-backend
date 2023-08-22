import { UserToTopic } from 'src/modules/user_to_topic/entities/user_to_topic.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';


@Entity({name: 'topics'})
export class Topic {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  topic_profile_img: string;

  @OneToMany(() => UserToTopic, (userToTopic) => userToTopic.user)
  users: UserToTopic[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
