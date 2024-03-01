import { gql } from "@apollo/client";

export const REGISTER_JOB=gql`
mutation($input:JobInput){
    registerJob(input:$input)
}
`