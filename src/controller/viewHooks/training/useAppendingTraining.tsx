/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FIND_TRAINING_BY_NCNM_APPROVAL_STATUS_AFTER_DEADLINE } from "../../../graphQl/queries/TrainingQueries";
import { PaginationInput } from "../../../typeDefs/PaginationInput";

export const useAppendingTraining=(NcnmStatus:string,pagination:PaginationInput)=>{
const [appendingTrainingDetail,setAppendingTrainingDetail]=useState<any>({});
const [pageNumber,setPageNumber]=useState(0);
const [totalPage,setTotalPage]=useState(0);
const [pageSize,setPageSize]=useState(0);
const data=useQuery(FIND_TRAINING_BY_NCNM_APPROVAL_STATUS_AFTER_DEADLINE,{variables:{status:NcnmStatus,input:pagination}});
const [isLoadingAppendingTrainingData,setIsLoadingAppendingTraingDatas]=useState(true);
useEffect(
    ()=>{
       const fetchData=async()=>{
            return await data.data;
        }
        fetchData().then((data)=>{
            setAppendingTrainingDetail(data.findListOfNcnmApprovalStatusAfterDeadline);
            setPageNumber(data.pageNumber);
            setTotalPage(data.totalPages);
            setPageSize(data.size);
            setIsLoadingAppendingTraingDatas(false)}).catch(err=>err)
    }
)
return{appendingTrainingDetail,isLoadingAppendingTrainingData,pageNumber,pageSize,totalPage}
}