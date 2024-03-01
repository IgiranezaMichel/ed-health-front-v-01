import { gql } from "@apollo/client";

export const CHANGE_TRAINING_APPLICATION_STATUS_BY_HOSPITAL_ADMIN=gql`
mutation($trainingId:Long,$trainingStatus:String){
    changeApplicantStatusByHospitalAdmin(trainingId:$trainingId,trainingStatus:$trainingStatus)
}
`