import { gql } from "@apollo/client";

export const REGISTER_FACULTY=gql`
mutation($input:FacultyInput){
    registerFaculty(input:$input)
}
`