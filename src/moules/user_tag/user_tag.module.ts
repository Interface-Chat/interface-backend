import { Module } from '@nestjs/common';
import { UserTagService } from './services/user_tag.service';
import { UserTagController } from './controllers/user_tag.controller';

@Module({
  controllers: [UserTagController],
  providers: [UserTagService],
})
export class UserTagModule {}
