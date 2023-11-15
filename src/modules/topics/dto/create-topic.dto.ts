import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsNotEmpty()
  title: string;
  @IsOptional()
  @IsArray()
  tags: [];

  @IsOptional()
  @IsArray()
  users: [];

  @IsOptional()
  @IsString()
  description?: string;
}
