import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_HOSPITAL } from "../../../graphQl/queries/hospitalQueries";
import { PaginationInput } from "../../../typeDefs/PaginationInput";

export const useHospital=(input:PaginationInput)=>{
    const [allAvailableHospital,setAllAvailableHospital,]=useState([]);
    const [hospitalPageNumber,setHospitalPageNumber]=useState(0);
    const [hospitalPageSize,setHospitalPageSize]=useState(0);
    const [hospitalSize,setHospitalSize]=useState(0);
    const [isFindingHospital,setIsFindingHospital]=useState(true);
const {data}=useQuery(GET_ALL_HOSPITAL,{variables:{input:input}});
useEffect(
    ()=>{
        const fetchData=async()=>{
            return await data;
        }
        fetchData().then(data=>{console.log(data);setAllAvailableHospital(data.getAllHospital.content);setHospitalPageNumber(data.getAllHospital.pageNumber);setHospitalPageSize(data.getAllHospital.totalPages);setHospitalSize(data.getAllHospital.size);setIsFindingHospital(false)}).catch(err=>console.log(err));
    }
)
return {allAvailableHospital,isFindingHospital,hospitalPageNumber,hospitalPageSize,hospitalSize}
}