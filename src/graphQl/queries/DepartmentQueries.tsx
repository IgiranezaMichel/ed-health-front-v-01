import { gql } from "@apollo/client";

export const FIND_DEPARTMENT_BY_ID=gql`
query($id:Long){
    findDepartmentById(id:$id){
    name
    totalCourse
    totalCredit
    faculty{
      name
      school{
        name
        logo
        location{
          name
          Location{
            name
            Location{
              name
            }
          }
        }
      }
    }
  }
}
`