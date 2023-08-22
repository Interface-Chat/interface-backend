import { IsEmail } from "class-validator";

export class CreateUserDto {
    username:string;

    @IsEmail()
    email:string;
    mobile:string;
    password:string;
}
