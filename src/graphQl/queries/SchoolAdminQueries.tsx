import { gql } from "@apollo/client";

export const GET_SCHOOL_ADMIN_STATUS_STATISTICS=gql`
query{
    schoolAdminStatusStatistics{
        value
        label
    }
}
`