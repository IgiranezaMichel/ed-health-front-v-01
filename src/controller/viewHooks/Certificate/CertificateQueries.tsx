/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client"
import { _FIND_CERTIFICATE_BY_ID, _FIND_CERTIFICATE_BY_TRAINING_ID } from "../../../graphQl/queries/CertificateQueries"
import { useEffect, useState } from "react";

export const useFindCertificateByTrainingId_=(trainingId:number)=>{
const {data,refetch}=useQuery(_FIND_CERTIFICATE_BY_TRAINING_ID,{variables:{trainingId:trainingId}});
const [certificateList,setCertificateList]=useState<any>([]);
const [isLoading,setIsLoading]=useState(true);
useEffect(
    ()=>{
        const fetchData=async()=>{
            return await data;
        }
        fetchData().then(data=>{
            setCertificateList(data.findCertificateByTrainingId);
            setIsLoading(false);
        });
    }
)
return{certificateList,isLoading,refetch}
}
export const useFindCertificateById_=(id:number)=>{
const certificateDetails=useQuery(_FIND_CERTIFICATE_BY_ID);
}