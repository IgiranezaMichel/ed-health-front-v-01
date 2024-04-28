import { gql } from "@apollo/client";

export const REGISTER_SCHOOL_FOR_EXISTING_ACCOUNT_HOLDER=gql`
mutation($schoolInput:SchoolInput,$userEmail:String){
    registerSchoolForExistingAccountHolder(schoolInput:$schoolInput,userEmail:$userEmail)
}
`
export const REGISTER_SCHOOL_FOR_NEW_ACCOUNT_HOLDER=gql`
mutation($schoolInput:SchoolInput,$userInput:AccountHolderInput){
    registerSchoolForNewAccountHolder(schoolInput:$schoolInput,userInput:$userInput)
}
`