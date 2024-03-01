import { gql } from "@apollo/client";

export const SAVE_LOCATION = gql`
mutation ($input:LocationInput!){
    registerLocation(input:$input){
        
    }
}
`
export const DELETE_LOCATION_BY_ID = gql`
mutation($id:Long!){
    deleteLocationById(id:$id)
}
`
