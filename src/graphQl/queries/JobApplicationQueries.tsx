import { gql } from "@apollo/client";

export const GET_STUDENT_JOB_APPLICATION = gql`
query($studentId:Long,$status:String,$input:PaginationInput){
  getStudentJobApplicationList(studentId:$studentId,status:$status,input:$input){
    content{
      id
      timeStamp
      job{
        title
        deadline
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
export const FIND_JOB_APPLICATION_BY_JOB_ID_AND_STATUS=gql`
 query($jobId:Long,$input:PaginationInput,$status:String){
  findJobApplicationByJobIdAndJobStatus(jobId:$jobId,input:$input,status:$status){
    pageNumber
    totalPages
    size
    content{
      student{
        school{
          name
        }
        user{
          name
          profilePicture
          email
          phoneNumber
          gender
        }
        department{
          name
        }
			status
      }
    }
  }
}
`
export const STUDENT_JOB_APPLICATION_HISTORY_LIST=gql`
query($userId:Long){
  getJobApplicationListByUserId(userId:$userId){
  job{
    title
    status
  }
  status
  timeStamp
}}
`