import { useEffect, useState } from "react";
import { Role } from "../../../enums/Role";
import { TOTAL_ACCOUNT_HOLDER_BY_ROLE } from "../../../graphQl/queries/UserQueries";
import { useQuery } from "@apollo/client";
export const useGetTotalAccountHolderByRole=(role:Role)=>{
    const [total,setTotal]=useState(0);
    const [resultHasFound,setResultHasFound]=useState(false);
const {data}=useQuery(TOTAL_ACCOUNT_HOLDER_BY_ROLE,{variables:{role:role}});
useEffect(
    ()=>{
        const fetchData=async()=>{
            return await data;
        }
        fetchData().then(data=>{setTotal(data.getTotalAccountHolderByRole);setResultHasFound(true)}).catch(err=>console.log(err));
    }
)
return {total,resultHasFound}
}
