import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTagDto } from './create-user_tag.dto';

export class UpdateUserTagDto extends PartialType(CreateUserTagDto) {}
