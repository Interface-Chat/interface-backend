
export type CreaetUserType={
    username:string;
    fullname:string;
    email:string;
    mobile:string;
    password:string;
    // role:string[];
}
export type UserByIdType={
    id:number;
    username:string;
    fullname:string;
    email:string;
    mobile:string;
    password:string;
}
export type ChangePassWordType = {
    new_password:string;
    password:string;
}
export type ReturnUserDetail = {
    id:number;
    username:string;
    fullname:string;
    email:string;
    mobile:string;
    password:string;
    role:string; 
}
export type UpdateUserType={
    username:string;
    fullname:string;
    email:string;
    mobile:string;
    // password:string;
}

