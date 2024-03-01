import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FIND_USER_BY_ID } from "../../../graphQl/queries/UserQueries";
export const useFindUserById=(userId:number)=>{
    const [user,setUser,]=useState({});
    const [userHasFound,setUserHasFound]=useState(false);
const {data}=useQuery(FIND_USER_BY_ID,{variables:{id:userId}});
useEffect(
    ()=>{
        const fetchData=async()=>{
            return await data;
        }
        fetchData().then(data=>{setUser(data.findIUserById);setUserHasFound(true)}).catch(err=>console.log(err));
    }
)
return {user,userHasFound}
}