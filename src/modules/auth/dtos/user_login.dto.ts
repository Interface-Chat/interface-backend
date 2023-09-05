import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
    // @IsEmail()
    // email: string;
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    password: string;
}