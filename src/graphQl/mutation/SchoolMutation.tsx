import { gql } from "@apollo/client";

export const REGISTER_SCHOOL=gql`
mutation($input:SchoolInput){
    registerSchool(input:$input)
}
`