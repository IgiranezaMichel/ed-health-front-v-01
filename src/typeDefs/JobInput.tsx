import { JobStatus } from "../enums/JobStatus"

export type JobInput={
    id: number,
    title: string,
    description: string,
    deadline: string,
    picture:string,
    numberOfEmployee:number,
    hospitalId: number,
    status:JobStatus,
    jobRequirement:string
}