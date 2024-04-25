import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
mutation($input:AccountHolderInput){
    registerUser(input:$input){
    id
    name
    gender
  }
}
`
export const FIND_USER_BY_EMAIL = gql`
mutation($email:String)
{
  findAccountHolderByEmail(email:$email){
  id
  name
  gender
  phoneNumber
  dob
  profilePicture
}
}
`