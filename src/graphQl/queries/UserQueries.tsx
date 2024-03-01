import { gql } from "@apollo/client";

export const FIND_USER_BY_ID=gql`
query($id:Long){
  findIUserById(id:$id){
    id
    name
    gender
    email
    phoneNumber
    profilePicture
    dob
  }
}
`
export const FIND_USER_LIST_BY_ROLE=gql`
query($role:Role,$input:PaginationInput){
  getAllUserByRole(role:$role,input:$input){
    content{
      name
      gender
      email
      phoneNumber
      profilePicture
    }
    pageNumber
    totalPages
    size
  }
}
`