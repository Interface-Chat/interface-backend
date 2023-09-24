import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MIN_LENGTH,
} from 'class-validator';
// import { ERole } from 'src/modules/roles/role.enum';
// import { User } from '../entities/user.entity';
// // import { Exclude } from 'class-transformer';

export class CreateUserDto {

  @IsNotEmpty()
  username: string;
  @IsOptional()
  fullname: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  mobile: string;
  // @Exclude()
  profile_img: string;
  
  // @MIN_LENGTH({8})
  password: string;

  // CreateAT:Date;

  @IsNotEmpty()
  role_id: any;

  

}
