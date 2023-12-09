import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  // MIN_LENGTH,
} from 'class-validator';
// import { ERole } from 'src/modules/roles/role.enum';
// import { User } from '../entities/user.entity';
// // import { Exclude } from 'class-transformer';

// this admin create for user

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  username: string;
  @IsOptional()
  fullname: string;
  // @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  mobile: string;

  dob:Date;
  
  // @Exclude()
  profile_img: string;
  
  // @MIN_LENGTH({8})
  @IsNotEmpty()
  @IsString()
  password: string;

  // CreateAT:Date;

  @IsOptional()
  role_id: any;

  

}
