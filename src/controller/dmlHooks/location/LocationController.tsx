import { useMutation, useQuery } from "@apollo/client"
import { DELETE_HOSPITAL_BY_ID } from "../../../graphQl/mutation/hospitalMutations"
import { FIND_LOCATION_BY_ID, SEARCH_LOCATION } from "../../../graphQl/queries/locationQueries";
import { useState } from "react";
export const DeleteLocation = (id: number) => {
    const [deleteLocation, deleteResponse] = useMutation(DELETE_HOSPITAL_BY_ID);
    const deleteLocationHandler = async () => {
        deleteLocation({ variables: { id: id } });
    }
    deleteLocationHandler();
    return deleteResponse.data;
}
export const FindLocationById=(id:number)=>{
const findLocationResponse=useQuery(FIND_LOCATION_BY_ID,{variables:{id:id}});
const findLocationHandler=async()=>{
    return await findLocationResponse.data;
}
findLocationHandler();
return id;
}
export const SearchLocation=(search:string)=>{
    const [searchResult,setSearchResult]=useState([])
    const result=useQuery(SEARCH_LOCATION,{variables:{input:search}});
    const searchHandler=async()=>{
      return await result.data;
    }
    searchHandler().then(data=>{setSearchResult(data.searchLocation)}).catch(err=>err);
    console.log(searchResult)
    return searchResult;
    }