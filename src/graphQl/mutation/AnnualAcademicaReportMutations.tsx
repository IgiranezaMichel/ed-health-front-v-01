import { gql } from "@apollo/client";

export const SAVE_ANNUAL_ACADEMIC_REPORT=gql`
mutation($input:AcademicAnnualResultInput){
    saveAnnualAcademicReport(input:$input) 
}
`