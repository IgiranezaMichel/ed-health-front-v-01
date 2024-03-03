import { gql } from "@apollo/client";

export const REGISTER_JOB_APPLICATION=gql`
mutation($studentId:Long,$jobId:Long,$status:String){
registerJobApplication(studentId:$studentId,jobId:$jobId,status:$status)
}
`