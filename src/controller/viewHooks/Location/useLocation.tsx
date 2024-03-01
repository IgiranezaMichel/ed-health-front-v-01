import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LIST_OF_LOCATION } from "../../../graphQl/queries/locationQueries";

export const useLocation=(sortBy:string)=>{
   const [locationList,setLocationList]=useState([]);
   const [isLoading,setIsLoading]=useState(true);
   const {data}=useQuery(LIST_OF_LOCATION,{
    variables:{sortBy:sortBy}
   });
   useEffect(
    ()=>{
        const fetchLocation=async()=>{
           if(data){
            setLocationList(data.getAllLocation);
            setIsLoading(false);
           }
        }
        fetchLocation().then().catch(err=>console.log(err));
    }
   )
   return {locationList,isLoading}
}