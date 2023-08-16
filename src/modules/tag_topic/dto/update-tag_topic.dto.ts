import { PartialType } from '@nestjs/mapped-types';
import { CreateTagTopicDto } from './create-tag_topic.dto';

export class UpdateTagTopicDto extends PartialType(CreateTagTopicDto) {}
