import { Injectable } from '@nestjs/common';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { UserTag } from '../entities/user_tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserTagDto } from '../dto/create-user_tag.dto';

@Injectable()
export class UserTagService {
  constructor(
    @InjectRepository(User) private userRepositiry: Repository<User>,
    @InjectRepository(UserTag) private usertagRepositiry: Repository<UserTag>,
    @InjectRepository(Tag) private tagRepositiry: Repository<Tag>,

  ){}

  async createUserTag(userTagDto:CreateUserTagDto){
    const usertag = new UserTag();
    usertag.user = userTagDto.user_id;
    usertag.tag = userTagDto.tag_id;
    return await this.usertagRepositiry.save(usertag);
    // await usertag.save();
  }

  
}
