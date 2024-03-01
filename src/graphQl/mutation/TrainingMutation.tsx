import { gql } from "@apollo/client";

export const REGISTER_TRAINING = gql`
mutation($input:TrainingInput){
    registerTraining(input:$input){
    id
    title
    } 
}
`
export const DELETE_TRAINING = gql`
mutation($id:Long){
    deleteTrainingById(id:$id)
}
`
export const MODIFY_TRAINING_STATUS=gql`
mutation($trainingId: Long!, $status: ID) {
    updateTrainingStatus(trainingId: $trainingId, status: $status)
}
`