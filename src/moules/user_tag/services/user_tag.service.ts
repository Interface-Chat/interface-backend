import { Injectable } from '@nestjs/common';
import { CreateUserTagDto } from '../dto/create-user_tag.dto';
import { UpdateUserTagDto } from '../dto/update-user_tag.dto';

@Injectable()
export class UserTagService {
  create(createUserTagDto: CreateUserTagDto) {
    return 'This action adds a new userTag';
  }

  findAll() {
    return `This action returns all userTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userTag`;
  }

  update(id: number, updateUserTagDto: UpdateUserTagDto) {
    return `This action updates a #${id} userTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTag`;
  }
}
