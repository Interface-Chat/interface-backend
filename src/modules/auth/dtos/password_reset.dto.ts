import { IsNotEmpty } from "class-validator";

export class ChangePassWord{
   
    @IsNotEmpty()
    password:string;
    @IsNotEmpty()
    new_password:string;

}