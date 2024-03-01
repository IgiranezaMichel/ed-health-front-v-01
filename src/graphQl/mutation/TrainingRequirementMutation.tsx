import { gql } from "@apollo/client";

export const SAVE_TRAINING_REQUIREMENT=gql`
mutation($input:TrainingRequirementInput){
    saveTrainingRequirement(input:$input)
}
`