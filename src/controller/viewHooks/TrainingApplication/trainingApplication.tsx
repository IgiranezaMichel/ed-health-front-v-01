/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { useQuery } from "@apollo/client";
import {GET_TRAINING_APPLICANT_PAGE_BY__HOSPITAL_APPROVAL_STATUS } from "../../../graphQl/queries/TrainingApplicationQueries";

export const useGetTrainingApplicantPage=(status:string,trainingId:number,input:PaginationInput)=>{
    const {data,refetch}=useQuery(GET_TRAINING_APPLICANT_PAGE_BY__HOSPITAL_APPROVAL_STATUS,{variables:{status:status,trainingId:trainingId,input:input}});
    const [trainingApplicants,setTrainingApplicants]=useState<any>([]);
    const [isLoadingApplicant,setIsLoadingApplicant]=useState(true);
    useEffect(
        ()=>{
           const fetchData=async()=>{
                return await data;
            }
            fetchData().then((data)=>{setTrainingApplicants(data.getTrainingApplicantPageByHospitalApprovalStatus);setIsLoadingApplicant(false)}).catch(err=>err)
        }
    )
    const refetchApplicants=()=>{
        refetch();
    }
    return{refetchApplicants,trainingApplicants,isLoadingApplicant}
    }