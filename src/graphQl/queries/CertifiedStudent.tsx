import { gql } from "@apollo/client";

export const GET_STUDENT_CERTIFICATE_PAGE=gql`
mutation($studentId:Long,$input:PaginationInput){
    getStudentCertificatePage(studentId:$studentId,input:$input){
    }
}
`