import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './configs/database.config';

import { ChatModule } from './modules/chat/chat.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
// import { RolePermissionModule } from './modules/role_permission/role_permission.module';
// import { PermissionsModule } from './modules/permissions/permissions.module';
import { TopicsModule } from './modules/topics/topics.module';
import { TopicContentsModule } from './modules/topic_contents/topic_contents.module';
import { UserTagModule } from './modules/user_tag/user_tag.module';
import { TagsModule } from './modules/tags/tags.module';
import { TagTopicModule } from './modules/tag_topic/tag_topic.module';
import { UserToTopicModule } from './modules/user_to_topic/user_to_topic.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express/multer';
import { multerConfig } from './configs/multer.config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/roles/roles.guard';
// import { ChatService } from './modules/chat/services/chat.service';
// import { TopicContentsService } from './modules/topic_contents/services/topic_contents.service';





@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  MulterModule.register(multerConfig),
  TypeOrmModule.forRoot(databaseConfig), // Connect to the database
  ChatModule, UsersModule,
  RolesModule,
  TagsModule,
  UserTagModule,
  TopicsModule, TopicContentsModule, UserTagModule, TagsModule, 
  TagTopicModule, UserToTopicModule, AuthModule],
  controllers: [],
  providers: [
    // MulterModule,
    {
      provide:APP_GUARD,
      useClass:RolesGuard
    }
  ],
})
export class AppModule {}
