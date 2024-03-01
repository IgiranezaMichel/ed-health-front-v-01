/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Role } from "../../../enums/Role";
import { FIND_USER_LIST_BY_ROLE } from "../../../graphQl/queries/UserQueries";
import { PaginationInput } from "../../../typeDefs/PaginationInput";

export const useFindListOfUserByRole=(role:Role,input:PaginationInput)=>{
    const [users,setUsers,]=useState<any>({});
    const [userListIsAvailable,setUserListIsAvailable]=useState(false);
const {data}=useQuery(FIND_USER_LIST_BY_ROLE,{variables:{role:role,input:input}});
useEffect(
    ()=>{
        const fetchData=async()=>{
            return await data;
        }
        fetchData().then(data=>{setUsers(data.getAllUserByRole);setUserListIsAvailable(true)}).catch(err=>console.log(err));
    }
)
return {users,userListIsAvailable}
}