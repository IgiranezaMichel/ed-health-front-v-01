import { gql } from "@apollo/client";

export const CERTIFY_STUDENT=gql`
mutation($trainingApplicationId:Long,$applicationStatus:String,$certifyStudentInput:CertifiedStudentInput){
    certifyStudent(trainingApplicationId:$trainingApplicationId,applicationStatus:$applicationStatus,certifyStudentInput:$certifyStudentInput)
}
`