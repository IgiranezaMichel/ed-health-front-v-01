import { Role } from "../enums/Role"
export type AccountHolderInput={
    id:number,
    name:string,
    gender:string,
    email:string,
    phoneNumber:string,
    profilePicture:string,
    dob?:string,
    password:string,
    role?:Role
}