import { gql } from "@apollo/client";

export const REGISTER_HOSPITAL_ADMIN=gql`
mutation($hospitalAdmin:HospitalAdminInput,$user:AccountHolderInput){
    registerHospitalAdmin(hospitalAdmin:$hospitalAdmin,user:$user)
}
`