import { gql } from "@apollo/client";

export const FIND_ALL_STUDENT_FROM_SAME_SCHOOL_PAGE=gql`
query($schoolId:Long,$input:PaginationInput){
    studentFromSameSchoolListPage(schoolId:$schoolId,input:$input){
  content{
      id
      department{
      name
    }
      user{
        id
        name
        email
        phoneNumber
        gender
        profilePicture
      }
      status
    }
    pageNumber
    totalPages
    size
  }
}
`
export const FIND_STUDENT_FROM_SAME_SCHOOL_BY_STATUS=gql`
query($schoolId:Long,$status:StudentStatus,$input:PaginationInput){
    findStudentFromSameSchoolByStatusListPage(schoolId:$schoolId,status:$status,input:$input) 
  {
     content{
      id
      user{
        id
        name
        email
        phoneNumber
        gender
        profilePicture
      }
      status
    }
    pageNumber
    totalPages
    size
  }
  }
`
export const FIND_STUDENT_BY_ID=gql`
query($id:Long){
  findStudentById(id:$id){
    id
    startingDate
    endingDate
    user{
      name
      gender
      email
      phoneNumber
      profilePicture
      dob
    }
    department{
      name
      totalCourse
      totalCredit
    }
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
    status
  }
}
`
export const STUDENT_FROM_SAME_SCHOOL_STATISTICS_BY_STATUS=gql`
query($schoolId:Long){
  studentFromSameSchoolStatisticsByStatus(schoolId:$schoolId){
    value
    label
  }
}
`
export const GET_STUDENT_STATUS_STATISTICS=gql`
query{
  studentStatisticsByStatus{
        value
        label
    }
}
`