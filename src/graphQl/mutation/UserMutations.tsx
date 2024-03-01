import { gql } from "@apollo/client";

export const REGISTER_USER=gql`
mutation($input:AccountHolderInput){
    registerUser(input:$input){
    id
    name
    gender
  }
}
`