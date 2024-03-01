import { gql } from "@apollo/client";

export const LIST_OF_LOCATION=gql`
query ($sortBy:String){
  getAllLocation(sortBy:$sortBy){
    name
    type
    Location{
      name
      type
    }
    locationList{
      id
      name
    }
  }
}
`
export const FIND_LOCATION_BY_ID = gql`
query($id:Long!){
    findLocationById(id:$id){
      name
      type
    locationList{
      id
      name
    }
    }
}
`
export const SEARCH_LOCATION=gql`
query($input:String){
  searchLocation(search:$input){
    id
    name
  Location{
    name
    type
  }
  }
}
`
export const FILTER_LOCATION_BY_TYPE=gql`
query($sort:String,$type:String){
  filterLocationByType(sort:$sort,type:$type){
    id
      name
    locationList{
      id
      name
      locationList{
        id
        name
      }
    }
    }
}
`