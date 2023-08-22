import { PartialType } from '@nestjs/mapped-types';
import { CreateUserToTopicDto } from './create-user_to_topic.dto';

export class UpdateUserToTopicDto extends PartialType(CreateUserToTopicDto) {}
