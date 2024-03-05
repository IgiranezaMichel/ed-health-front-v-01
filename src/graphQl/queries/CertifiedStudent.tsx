import { gql } from "@apollo/client";

export const GET_STUDENT_CERTIFICATE_PAGE = gql`
query($studentId:Long,$input:PaginationInput){
    getStudentCertificatePage(studentId:$studentId,input:$input){
    pageNumber
    totalPages
    size
    content{
        content{
      certificate{
        title
        timeStamp
        training{
          title
          location{
            name
            Location{
              name
              Location{
                name
              }
            }
          }
        }
      }
      
    }
      
    }
    }
}
`