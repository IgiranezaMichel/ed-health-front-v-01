import { gql } from "@apollo/client";

export const REGISTER_JOB_APPLICATION=gql`
mutation($studentId:Long,$jobId:Long,$status:String){
registerStudentJobApplication(studentId:$studentId,jobId:$jobId,status:$status)
}
`
export const CHANGE_JOB_APPLICATION_STATUS_BY_HOSPITAL_ADMIN=gql`
mutation($id:Long,$status:String){
    changeJobApplicantStatusByHospitalAdmin(id:$id,status:$status)
}
`