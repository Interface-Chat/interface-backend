import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './configs/database.config';

import { ChatModule } from './modules/chat/chat.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { RolePermissionModule } from './modules/role_permission/role_permission.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { TopicsModule } from './modules/topics/topics.module';
import { TopicContentsModule } from './modules/topic_contents/topic_contents.module';
import { UserTagModule } from './modules/user_tag/user_tag.module';
import { TagsModule } from './modules/tags/tags.module';
import { TagTopicModule } from './modules/tag_topic/tag_topic.module';
import { ChatService } from './modules/chat/services/chat.service';
import { UserToTopicModule } from './modules/user_to_topic/user_to_topic.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  })
  ,TypeOrmModule.forRoot(databaseConfig), // Connect to the database
  ChatModule, UsersModule, RolesModule, 
  RolePermissionModule, PermissionsModule, 
  TopicsModule, TopicContentsModule, UserTagModule, TagsModule, 
  TagTopicModule, UserToTopicModule, AuthModule],
  controllers: [],
  providers: [ChatService],
})
export class AppModule {}
