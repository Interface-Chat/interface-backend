import { ERole } from "src/modules/roles/role.enum";

export class UpdateAuth{
    username:string;
    fullname:string;
    email:string;
    mobile:string;
    // password:string;
    role:ERole[];
}