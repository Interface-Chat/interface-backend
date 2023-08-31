import { IsNotEmpty } from "class-validator";

export class PassWord{
    username:string;
    @IsNotEmpty()
    password:string;

}