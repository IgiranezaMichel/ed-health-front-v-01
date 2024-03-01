/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client"
import { PaginationInput } from "../../../typeDefs/PaginationInput"
import { FIND_TRAINING_BY_NCNM_APPROVAL_STATUS } from "../../../graphQl/queries/TrainingQueries"
import { useEffect, useState } from "react";

export const useNcnmTrainingApprovalStatusPage=(input:PaginationInput,status:string)=>{
const {data,refetch}=useQuery(FIND_TRAINING_BY_NCNM_APPROVAL_STATUS,{variables:{input:input,status:status}});
const[hasFinishLoading,setHasFinishLoading]=useState(false);
const [trainingObj,setTrainingObj]=useState<any>({});
useEffect(
    ()=>{
        const fetchData=async()=>{
            return await data;
        }
        fetchData().then(
            (data)=>{setTrainingObj(data.findTrainingByNcnmApprovalStatusAndTrainingDeadlinePage);
            setHasFinishLoading(true)}
        )
    }
)
return{trainingObj,hasFinishLoading,refetch}
}