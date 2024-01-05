/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client"
import { _FIND_CERTIFICATE_BY_TRAINING_ID } from "../../../graphQl/queries/CertificateQueries"
import { useEffect, useState } from "react";

export const useFindCertificateByTrainingId=(trainingId:number)=>{
const {data,refetch}=useQuery(_FIND_CERTIFICATE_BY_TRAINING_ID,{variables:{trainingId:trainingId}});
const [certificateList,setCertificateList]=useState<any>([]);
useEffect(
    ()=>{
        const fetchData=async()=>{
            return await data;
        }
        fetchData().then(data=>setCertificateList(data.findCertificateByTrainingId))
        
    }
)

}