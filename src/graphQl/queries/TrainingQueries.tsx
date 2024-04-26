import { gql } from "@apollo/client";

export const GET_ALL_TRAINING=gql`
query($sort:String){
    getAllTraining(sort:$sort){
    id
    title
    description
    deadLine
    ncnmApprovalStatus
    trainer
    location
    hospital
    }
}
`
export const SEARCH_TRAINING=gql`
query($search:String){
    searchTraining(search:$search){
    id
    title
    description
    deadLine
    ncnmApprovalStatus
    trainer
    location
    hospital
    }
}
`
export const TRAINING_PAGINATION=gql`
query($input:PaginationInput){
    trainingPagination(input:$input){
    id
    title
    description
    deadLine
    ncnmApprovalStatus
    trainer
    location
    hospital
    }
}
`
export const FIND_TRAINING_BY_ID=gql`
query($id:Long){
  findTrainingById(id:$id){
    title
    description
    deadline
    timeStamp
    ncnmApprovalStatus
    hospital{
      name
      logo
      timeStamp
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
    hospital{
      name
      logo
      description
    }
    trainers{
      trainerTitle
      name
      phoneNumber
      profilePicture
    }
    applicantList{
      hospitalApprovalStatus
      studentApprovalStatus
      studentApprovalTimeStamp
      hospitalApprovalTimeStamp
    }
    trainingRequirement
  }
}
`
export const FIND_TRAINING_BY_NCNM_APPROVAL_STATUS_BEFORE_DEADLINE=gql`
query($status:String,$input:PaginationInput){
findListOfNcnmApprovalStatusBeforeDeadline(ncnmApprovalStatus:$status,input:$input){
  pageNumber
  totalPages
  size
  content{
    id
    title
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
`
export const FIND_TRAINING_BY_NCNM_APPROVAL_STATUS_AFTER_DEADLINE=gql`
query($status:String,$input:PaginationInput){
findListOfNcnmApprovalStatusAfterDeadline(ncnmApprovalStatus:$status,input:$input){
  pageNumber
  totalPages
  size
  content{
    id
    title
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
`
export const FIND_TRAINING_BY_NCNM_APPROVAL_STATUS=gql`
query($input:PaginationInput,$status:String){
  findTrainingByNcnmApprovalStatusAndTrainingDeadlinePage(input:$input,status:$status){
    content{
      id
      title
      hospital{
        name
      }
      deadline
    }
  }
}
`