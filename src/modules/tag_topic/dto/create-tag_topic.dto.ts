import { IsNotEmpty } from "class-validator";
import { Tag } from "src/modules/tags/entities/tag.entity";
import { Topic } from "src/modules/topics/entities/topic.entity";

export class CreateTagTopicDto {
  @IsNotEmpty()
  tag: Tag;
  @IsNotEmpty()
  topic: Topic;
}
