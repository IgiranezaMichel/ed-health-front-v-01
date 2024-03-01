import { gql } from "@apollo/client";

export const SAVE_JOB_REQUIREMENT=gql`
mutation($input:JobRequirementInput){
    saveJobRequirement(input:$input)  
}
`