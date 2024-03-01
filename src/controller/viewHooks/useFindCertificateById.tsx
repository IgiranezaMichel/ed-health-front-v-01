/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FIND_CERTIFICATE_BY_ID } from "../../graphQl/queries/CertificateQueries";

export default function useFindCertificateById(id:number) {
    const [certificateDetail,setCertificatesDetail]=useState<any>({});
    const [isLoadingCertificate,setIsLoadingCertificate]=useState(true);
    const data=useQuery(FIND_CERTIFICATE_BY_ID,{variables:{id:id}});
    useEffect(
       ()=>{
           const fetchData=async()=>{
               return await data.data;
           }
           fetchData().then(data=>{
               setCertificatesDetail(data.findCertificateById);
               setIsLoadingCertificate(false)
           }).catch(err=>err)
       }
    )
    return {certificateDetail,isLoadingCertificate}
}
