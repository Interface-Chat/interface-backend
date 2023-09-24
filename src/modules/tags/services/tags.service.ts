import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { Tag } from '../entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagRepositiry: Repository<Tag>,

  ) {}
  async createTag(tagDto:CreateTagDto){
    return await this.tagRepositiry.save(tagDto);
    // await tag save();
  }


}
