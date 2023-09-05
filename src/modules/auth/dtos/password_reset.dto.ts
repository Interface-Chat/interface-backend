import { IsNotEmpty } from "class-validator";

export class PassWord{
    user_id:number;
    new_password:string;
    @IsNotEmpty()
    password:string;

}