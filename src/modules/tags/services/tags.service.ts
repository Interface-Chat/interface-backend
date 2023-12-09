import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { Tag } from '../entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { map } from 'rxjs';
import { throws } from 'assert';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagRepositiry: Repository<Tag>,

  ) {}

  async createTag(tagDto:CreateTagDto){ 
    const tagExisting = await this.validatetag(tagDto.name);
    try{
      if(!tagExisting) return true;
    return await this.tagRepositiry.save(tagDto);


    }catch(e){
      if(e.tagExisting){
        throw new BadRequestException('This tag is  Existing.');
      }
      return false;
    }
    // await tag save();
  }

  //validate tag
  async validatetag(name:string){
    return this.tagRepositiry.findOne({
      where:{name:name}
    })

  }

  async findAll() {
    return await this.tagRepositiry.find();
  }
}
