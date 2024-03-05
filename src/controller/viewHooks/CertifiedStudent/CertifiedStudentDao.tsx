/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import {useQuery } from "@apollo/client";
import { GET_STUDENT_CERTIFICATE_PAGE } from "../../../graphQl/queries/CertifiedStudent";

export const useGetAllStudentCertificatePage=(studentId:number,input:PaginationInput)=>{
const [studentCertificateObj,setStudentCertificateObj]=useState<any>({});
const [isLoading,setIsLoading]=useState(true);
const {data,refetch}=useQuery(GET_STUDENT_CERTIFICATE_PAGE,{variables:{studentId:studentId,input:input}});
useEffect(
    ()=>{
        const fetchData=async()=>{
            console.log(data)
            return await data;
        }
        fetchData().then(data=>{
            setStudentCertificateObj(data.getStudentCertificatePage)
            console.log(studentCertificateObj)
            setIsLoading(false);
        })
    }
)
return{isLoading,refetch,studentCertificateObj}
}