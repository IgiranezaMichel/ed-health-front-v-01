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
      id
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
export const TOTAL_ACCOUNT_HOLDER_BY_ROLE=gql`
query($role:Role){
  getTotalAccountHolderByRole(role:$role)
}
`