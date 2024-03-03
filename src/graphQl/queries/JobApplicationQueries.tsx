import { gql } from "@apollo/client";

export const GET_STUDENT_JOB_APPLICATION = gql`
query($studentId:Long,$status:String,$input:PaginationInput){
  getStudentJobApplicationList(studentId:$studentId,status:$status,input:$input){
    content{
      id
      timeStamp
      job{
        title
        description
        status
        numberOfEmployee
        jobRequirement{
          description
        }
        hospital{
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
export const GET_JOB_APPLICATION_DETAIL=gql`
query($id:Long){
  getJobApplicationDetail(id:$id){
    id
    timeStamp
    job{
      title
      description
      deadline
      status
      numberOfEmployee
      timeStamp
      hospital{
        name
        logo
      }
      jobRequirement{
        description
      }
    }
  }
}
`