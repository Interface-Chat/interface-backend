import { ERole } from "src/modules/roles/role.enum";

export class UpdateAuth{
    username:string;
    fullname:string;
    email:string;
    mobile:string;
    dob:Date;
    // password:string;
    role:ERole[];
}