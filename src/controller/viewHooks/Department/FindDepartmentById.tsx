import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react"
import { FIND_DEPARTMENT_BY_ID } from "../../../graphQl/queries/DepartmentQueries";

export const useFindDepartmentById=(id:number)=>{
const [departmentDetail,setDepartmentDetail]=useState({});
const [finishLoading,setFinnishLoading]=useState(false);
const {data,refetch}=useQuery(FIND_DEPARTMENT_BY_ID,{variables:{id:id}});
useEffect(
    ()=>{
        const fetchData=async()=>{
            return await data;
        }
        fetchData().then(data=>{
            setDepartmentDetail(data.findDepartmentById);setFinnishLoading(true)})
            .catch(err=>err);
    }
)
return {refetch,finishLoading,departmentDetail}
}