import { Status } from "../enums/AdminStatus"

export type HospitalAdminInput={
    id:number,
    hospitalId:number,
    position:string,
    status?:Status,
    
  }