import { StudentStatus } from "../enums/StudentStatus"
export type StudentInput={
    id:number
    schoolId:number
    userId:number
    departmentId:number
    endingDate:string
    status:StudentStatus
}