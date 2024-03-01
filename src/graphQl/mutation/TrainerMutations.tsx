import { gql } from "@apollo/client";

export const REGISTER_TRAINER=gql`
mutation($input:TrainerInput){
    registerTrainer(input:$input)
}
`
export const DELETE_TRAINER_BY_ID=gql`
mutation($id:Long){
    deleteTrainerById(id:$id)
}
`