/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FILTER_LOCATION_BY_TYPE } from "../../../graphQl/queries/locationQueries";

export const useFilterLocation=(sort:string,type:string)=>{
    const [listOfLocationData,setListOfLocationData]=useState<any>([]);
    const[isLoading,setIsLoading]=useState(true);
    const locationData=useQuery(FILTER_LOCATION_BY_TYPE,{variables:{sort:sort,type:type}})
useEffect(
    ()=>{
        const fetchFilterLocation=async()=>{
             
           return await locationData.data;
        }
        fetchFilterLocation().then(data=>{setIsLoading(false);setListOfLocationData(data.filterLocationByType)}).catch(err=>err)
    }
)
return {listOfLocationData,isLoading}
}