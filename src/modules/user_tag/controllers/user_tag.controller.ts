import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTagService } from '../services/user_tag.service';
import { CreateUserTagDto } from '../dto/create-user_tag.dto';
import { UpdateUserTagDto } from '../dto/update-user_tag.dto';

@Controller('user-tag')
export class UserTagController {
  constructor(private readonly userTagService: UserTagService) {}

 
}
