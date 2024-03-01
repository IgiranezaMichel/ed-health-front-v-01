import { gql } from "@apollo/client";

export const GET_HOSPITAL_ADMIN_STATUS_STATISTICS=gql`
query{
    hospitalAdminStatisticByStatus{
        value
        label
    }
}
`