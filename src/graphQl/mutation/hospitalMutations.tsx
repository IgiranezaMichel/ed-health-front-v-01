import { gql } from "@apollo/client";
export const REGISTER_HOSPITAL=gql`
mutation($input:HospitalInput){
  registerHospital(input:$input) 
}
`
export const DELETE_HOSPITAL_BY_ID=gql`
mutation ($id:number){
  deleteHospitalById(id:$id)
}
`