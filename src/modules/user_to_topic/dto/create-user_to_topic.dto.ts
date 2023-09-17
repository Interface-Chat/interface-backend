import { User } from 'src/modules/users/entities/user.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';

export class CreateUserToTopicDto {
  user: User;
  topic: Topic;
}
