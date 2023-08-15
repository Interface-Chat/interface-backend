import { Module } from '@nestjs/common';
import { ChatModule } from './moules/chat/chat.module';
import { UsersModule } from './moules/users/users.module';
import { RolesModule } from './moules/roles/roles.module';
import { RolePermissionModule } from './moules/role_permission/role_permission.module';
import { PermissionsModule } from './moules/permissions/permissions.module';
import { TopicsModule } from './moules/topics/topics.module';
import { TopicContentsModule } from './moules/topic_contents/topic_contents.module';
import { MessagesModule } from './moules/messages/messages.module';
import { AttachmentsModule } from './moules/attachments/attachments.module';
import { UserTagModule } from './moules/user_tag/user_tag.module';
import { TagsModule } from './moules/tags/tags.module';
import { TagTopicModule } from './moules/tag_topic/tag_topic.module';


@Module({
  imports: [ChatModule, UsersModule, RolesModule, RolePermissionModule, PermissionsModule, TopicsModule, TopicContentsModule, MessagesModule, AttachmentsModule, UserTagModule, TagsModule, TagTopicModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
