import { IsNotEmpty } from "class-validator";

export class CreateUserTagDto {
    @IsNotEmpty()
    userid:any;
    @IsNotEmpty()
    tagid:any;
}

