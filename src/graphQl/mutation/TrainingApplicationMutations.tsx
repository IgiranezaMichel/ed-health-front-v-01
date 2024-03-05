import { gql } from "@apollo/client";

export const CHANGE_TRAINING_APPLICATION_STATUS_BY_HOSPITAL_ADMIN = gql`
mutation($trainingId:Long,$trainingStatus:String){
    changeApplicantStatusByHospitalAdmin(applicationId:$trainingId,applicationStatus:$trainingStatus)
}
`
export const REGISTER_STUDENT_TRAINING_APPLICATION = gql`
mutation($studentId:Long,$trainingId:Long,$studentApprovalStatus:String){
registerStudentTrainingApplication(studentId:$studentId,trainingId:$trainingId,studentApprovalStatus:$studentApprovalStatus)
}
`