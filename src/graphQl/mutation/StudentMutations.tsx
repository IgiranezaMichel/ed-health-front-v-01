import { gql } from "@apollo/client";

export const REGISTER_STUDENT=gql`
mutation($input:StudentInput,$user:AccountHolderInput){
    registerStudent(input:$input,user:$user)
}
`