import { gql } from "@apollo/client";
export const REGISTER_DEPARTMENT=gql`
mutation($input:DepartmentInput){
    registerDepartment(input:$input)
}
`