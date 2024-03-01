import { gql } from "@apollo/client";

export const LIST_OF_POSTED_JOB_BY_HOSPITAL=gql`
query($input:PaginationInput,$hospitalId:Long,$status:String){
        findJobsPostedByHospital(hospitalId:$hospitalId,input:$input,status:$status){
    content{
      id
      title
      description
      picture
      status
      deadline
      numberOfEmployee
      timeStamp
    }
    pageNumber
    totalPages
    size
  }
    }
`
export const  FIND_JOB_BY_ID=gql`
query($id:Long){
    findJobById(id:$id){
    title
    deadline
    timeStamp
    status
    picture
    jobRequirement{
      id
      description
    }
 
  }
}
`
export const FIND_POSTED_JOBS_PAGE=gql`
query($input:PaginationInput,$status:String){
  findJobsPostedPage(input:$input,status:$status){
    content{
      title
      deadline
      timeStamp
      numberOfEmployee
      hospital{
        name
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
    pageNumber
    totalPages
    size
  }
}
`