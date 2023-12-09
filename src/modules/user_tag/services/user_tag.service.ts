import { Injectable } from '@nestjs/common';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { UserTag } from '../entities/user_tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserTagDto } from '../dto/create-user_tag.dto';
import { UpdateUserTagDto } from '../dto/update-user_tag.dto';
import { use } from 'passport';
import { TagsService } from 'src/modules/tags/services/tags.service';

@Injectable()
export class UserTagService {
  constructor(
    @InjectRepository(User) private userRepositiry: Repository<User>,
    @InjectRepository(UserTag) private usertagRepositiry: Repository<UserTag>,
    @InjectRepository(Tag) private tagRepositiry: Repository<Tag>,
    // private tagService:TagsService,

  ) {}

  async createUserTag(userTagDto: CreateUserTagDto) {
    const usertag = new UserTag();
    try {
      usertag.user = await this.userRepositiry.findOne({
        where: { id: userTagDto.userid },
      });

      usertag.tag = await this.tagRepositiry.findOne({
        where: { id: userTagDto.tagid },
      });
      if (!usertag.tag) return false;
      if (userTagDto.tagid == null) return false;

      // console.log(userTagDto)
      return await this.usertagRepositiry.save(usertag);
    } catch (e) {
      // if(e && e.message){
      //   if(e.message.userTagDto.tagid==null){
      //     throw new BadRequestException('')

      //   }
      // }
      // if(!usertag.tag){
      //   // throw new BadRequestException('');

      // }
      console.log(e);
    }
  }

  async updateUserTagDto(usertagDtoupdate: UpdateUserTagDto) {
    const usertag = new UserTag();

    usertag.user = await this.userRepositiry.findOne({
      where: { id: usertagDtoupdate.userid },
    });

    usertag.tag = await this.tagRepositiry.findOne({
      where: { id: usertagDtoupdate.tagid },
    });

    return this.usertagRepositiry.save(usertag);
  }
  //get user and tag 
  async findUserTag() {
    return await this.usertagRepositiry.find({
      relations: { tag: true, user: true },
      // where: {
      //   tag: {
      //     name: nameTag,
      //   },
      // },
      select: { user: { username: true }, tag: { name: true } },
    });
  }
  // select a user by id relate to user
  async selectAUser(id:number){
     return await this.usertagRepositiry.findOne({
      where:{user:{id:id}},
      relations:{tag:true,user:true},
      select:{user:{username:true},tag:{name:true}}
    })
  }
  // select a tag relate to user id tag true get many user
  async selectBytag(name:string){
    return await this.usertagRepositiry.find({
      where:{tag:{name:name}},
      relations:{user:true},
      select:{user:{username:true,id:true}}
    })
  }


  //for role select 
  // async roleSelectBytag(name:string){
  //   const check = await this.tagService.validatetag(name);
  //   try{
  //     if(!check) return false;
  //     return await this.usertagRepositiry.find({
  //       where:{tag:{name:name}},
  //       relations:{user:true},
  //       select:{user:{username:true,id:true}}
  //     })
  //   }catch(e){
      
  //   }
    
  // }

  // 






  // async findTag(name:string){
  //   await this.tagRepositiry.findOne({
  //     where:{name:name},
  //     relations:{userToTag:true},
  //   })

  // }
}
