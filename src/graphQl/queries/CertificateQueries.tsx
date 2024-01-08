import { gql } from "@apollo/client";

export const CERTIFICATE_PAGE=gql`
query($input:PaginationInput){
  certificatePage(input:$input){
    content{
      id
      title
      timeStamp
      training{
        title
      }
    }
    pageNumber
    totalPages
    size
  }
}
`
export const FIND_CERTIFICATE_BY_ID=gql`
query($id:Long){
  findCertificateById(id:$id){
    title
    description
    signature
    stamp
    timeStamp
    training{
      title
      deadline
      timeStamp
      hospital{
        name
        logo
      }
      trainers{
        trainerTitle
        name
        phoneNumber
        profilePicture
        signature
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
export const _FIND_CERTIFICATE_BY_TRAINING_ID=gql`
query($trainingId:Long){
  findCertificateByTrainingId(trainingId:$trainingId){
    title
    accountHolder{
      name
    }
    timeStamp
    certifiedStudentList{
      id
    }
    certifiedStudentList{
      id
    }
  }
}
`
