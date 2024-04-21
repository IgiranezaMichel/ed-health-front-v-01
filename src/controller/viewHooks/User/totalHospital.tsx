import { useQuery } from "@apollo/client"
import { TOTAL_HOSPITAL } from "../../../graphQl/queries/hospitalQueries"
import { useEffect, useState } from "react";

export const useTotalHospital=()=>{
    const [total,setTotal]=useState(0);
    const [resultHasFound,setResultHasFound]=useState(false);
const {data}=useQuery(TOTAL_HOSPITAL);
useEffect(
    ()=>{
        const fetchData=async()=>{
            return await data;
        }
        fetchData().then(data=>{setTotal(data.totalHospital);setResultHasFound(true)}).catch(err=>console.log(err));
    }
)
return {total,resultHasFound}
}