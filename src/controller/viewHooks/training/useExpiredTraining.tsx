/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FIND_TRAINING_BY_NCNM_APPROVAL_STATUS_BEFORE_DEADLINE } from "../../../graphQl/queries/TrainingQueries";
import { PaginationInput } from "../../../typeDefs/PaginationInput";

export const useExpiredTraining=(NcnmStatus:string,pagination:PaginationInput)=> {
    const [expiredTrainingDetail,setExpiredTrainingDetail]=useState<any>({});
    const data=useQuery(FIND_TRAINING_BY_NCNM_APPROVAL_STATUS_BEFORE_DEADLINE,{variables:{status:NcnmStatus,input:pagination}});
    const [isLoadingExpiredTrainingData,setIsLoadingExpiredTrainingData]=useState(true);
    useEffect(
        ()=>{
           const fetchData=async()=>{
                return await data.data;
            }
            fetchData().then((data)=>{setExpiredTrainingDetail(data.findListOfNcnmApprovalStatusBeforeDeadline);setIsLoadingExpiredTrainingData(false)}).catch(err=>err)
        }
    )
    return{expiredTrainingDetail,isLoadingExpiredTrainingDatas: isLoadingExpiredTrainingData}
    }