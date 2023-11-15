import { User } from 'src/modules/users/entities/user.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateUserToTopicDto {
  @IsNotEmpty()
  user: User;
  @IsNotEmpty()
  topic: Topic;
}
