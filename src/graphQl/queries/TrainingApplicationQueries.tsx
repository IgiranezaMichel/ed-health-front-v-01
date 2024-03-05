import { gql } from "@apollo/client";

export const GET_TRAINING_APPLICANT_PAGE_BY__HOSPITAL_APPROVAL_STATUS=gql`
query($status:String,$trainingId:Long,$input:PaginationInput){
  getTrainingApplicantPageByHospitalApprovalStatus(status:$status,trainingId:$trainingId,input:$input){
      pageNumber
    totalPages
    size
    content{
      id
      hospitalApprovalStatus
      hospitalApprovalTimeStamp
      student{
        id
        user{
          name
          email
          phoneNumber
          profilePicture
        }
        department{
          name
          faculty{
            name
          }
        }
        status
        school{
          name
          logo
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
`
export const GET_STUDENT_TRAINING_APPLICATION_PAGE=gql`
query($input:PaginationInput,$studentId:Long,$status:String){
  getStudentTrainingApplicationPage(input:$input,studentId:$studentId,status:$status){
    pageNumber
    totalPages
    size
    content{
       training{
        title
        description
        deadline
        timeStamp
        hospital{
          name
          logo
        }
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
`