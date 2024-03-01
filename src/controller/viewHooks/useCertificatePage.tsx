/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CERTIFICATE_PAGE } from "../../graphQl/queries/CertificateQueries";
import { PaginationInput } from "../../typeDefs/PaginationInput";

export const useCertificatePage=(input:PaginationInput)=> {
 const [certificatesDetail,setCertificatesDetail]=useState<any>({});
 const [isLoadingCertificates,setIsLoadingCertificates]=useState(true);
 const data=useQuery(CERTIFICATE_PAGE,{variables:{input:input}});
 useEffect(
    ()=>{
        const fetchData=async()=>{
            return await data.data;
        }
        fetchData().then(data=>{
            setCertificatesDetail(data.certificatePage);
            setIsLoadingCertificates(false)
        }).catch(err=>err)
    }
 )
 return {certificatesDetail,isLoadingCertificates}
}
