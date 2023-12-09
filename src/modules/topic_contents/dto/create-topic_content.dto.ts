import { User } from 'src/modules/users/entities/user.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateTopicContentDto {
    message: string;
    attach: string;
    @IsNotEmpty()
    user: User;
    @IsNotEmpty()
  topic: Topic;
  }