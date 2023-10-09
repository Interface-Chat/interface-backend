import { Module } from '@nestjs/common';
import { UserTagService } from './services/user_tag.service';
import { UserTagController } from './controllers/user_tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTag } from './entities/user_tag.entity';
import { User } from '../users/entities/user.entity';
import { Tag } from '../tags/entities/tag.entity';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports:[
    TagsModule,
    TypeOrmModule.forFeature(
      [UserTag,User,Tag]
    )
  ],
  controllers: [UserTagController],
  providers: [UserTagService],
})
export class UserTagModule {}
