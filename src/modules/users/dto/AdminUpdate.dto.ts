import { IsOptional } from "class-validator";

export class AdminUpdateUserDto{
    // id:number;
    username:string;
    fullname:string;
    email:string;
    mobile:string;
    password:string;
    profile_img?: string;
   
    @IsOptional()
    role_id:any;
    
}