import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicContentDto } from './create-topic_content.dto';

export class UpdateTopicContentDto extends PartialType(CreateTopicContentDto) {}
