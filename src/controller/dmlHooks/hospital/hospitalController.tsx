import { useMutation, useQuery } from "@apollo/client"
import { DELETE_HOSPITAL_BY_ID } from "../../../graphQl/mutation/hospitalMutations";
import { HOSPITAL_PAGINATION, SEARCH_HOSPITAL } from "../../../graphQl/queries/hospitalQueries";
import { useEffect, useState } from "react";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
export const DeleteHospital=(id:number)=>{
// const[deleteResponse,setDeleteResponse]=useState('');
const [deleteById,deleteResponse]=useMutation(DELETE_HOSPITAL_BY_ID);
const deleteHospitalHandler=async()=>{
   await deleteById({
      variables:{id:id}
   });
}
deleteHospitalHandler();
return deleteResponse;
}
export const SearchHospital=(search:string)=>{
const [searchResult,setSearchResult]=useState([])
const result=useQuery(SEARCH_HOSPITAL,{variables:{input:search}});
const searchHandler=async()=>{
  return await result.data;
}
searchHandler().then(data=>{setSearchResult(data.searchHospital)}).catch(err=>err);
return searchResult;
}
export const UseHospitalPagination=(pagination:PaginationInput)=>{
   const[hospitalList,sethospitalList]=useState([]);
   const hospitalData=useQuery(HOSPITAL_PAGINATION,{variables:{input:pagination}});
   useEffect(
       ()=>{
   const fetchhospitalData=async()=>{
      return await hospitalData.data;
   }
   fetchhospitalData().then(data=>sethospitalList(data.getAllhospital)).catch(err=>console.log(err))
       },[hospitalData,hospitalList,pagination]) 
}
