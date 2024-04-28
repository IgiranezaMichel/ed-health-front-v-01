import { Status } from "../enums/AdminStatus"

export type  AdminInput={
    position:string
    startingDate:string
    endDate:string
    status:Status
  }