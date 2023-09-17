export type CreaetUserType={
    username:string;
    fullname:string;
    email:string;
    mobile:string;
    password:string;
}
export type UserByIdType={
    id:string;
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