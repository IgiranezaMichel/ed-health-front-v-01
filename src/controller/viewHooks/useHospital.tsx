/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FIND_HOSPITAL_AND_NCNm_APPROVAL_STATUS, FIND_HOSPITAL_BY_ID, HOSPITAL_LIST } from "../../graphQl/queries/hospitalQueries";
import { PaginationInput } from "../../typeDefs/PaginationInput";
export const useHospital=(sortBy:string)=>{
  const [isLoading,setIsLoading]=useState(false);
  const {data}=useQuery(HOSPITAL_LIST,{
        variables:{sortBy:sortBy}
    });
    const[hospitalList,setHospitalList]=useState(sortBy)
    useEffect(
        ()=>{
            const fetchHospital=async()=>{
                if(data){
                setHospitalList(data.getAllHospital);
                setIsLoading(false);
            }
            }
            fetchHospital();
        },[data,sortBy]
    )
    return{hospitalList,isLoading}
}
export const useFindHospitalByHospitalAndNcnmStatus=(hospitalId:number,ncnmStatus:string,paginationInput:PaginationInput)=>{
    const [trainingList,setTrainingList]=useState([]);
    const [hasLoaded,setHasLoaded]=useState(false);
    const [totalPage,setTotalPage]=useState(0);
    const [size,setSize]=useState(0);
    const [currentPage,setCurrentPage]=useState(0);
    const content=useQuery(FIND_HOSPITAL_AND_NCNm_APPROVAL_STATUS,{
        variables:{
             hospitalId:hospitalId,ncnmApprovalStatus:ncnmStatus,input:paginationInput
        }
    })
    useEffect(
        ()=>{
           const fetchData=async()=>{
                return await content.data;
            }
            fetchData().then(data=>{
                setTrainingList(data.findListOfTrainingByHospitalIdAndNcnmApprovalStatus.content);
                setTotalPage(data.findListOfTrainingByHospitalIdAndNcnmApprovalStatus.totalPages);
                setCurrentPage(data.findListOfTrainingByHospitalIdAndNcnmApprovalStatus.pageNumber);
                setSize(data.findListOfTrainingByHospitalIdAndNcnmApprovalStatus.size);
                setHasLoaded(true);
            }).catch(err=>console.log(err));
        },[hospitalId,ncnmStatus,trainingList,content.data]
    )
    return {trainingList,hasLoaded,currentPage,totalPage,size}
}
export const useFindHospitalById=(id:number)=>{
   const hospitalData=useQuery(FIND_HOSPITAL_BY_ID,{variables:{id:id}});
   const [hospitalDetail,setHospitalDetail]=useState<any>({});
   const [isProcessingHospitalData,setIsProcessingHospitalData]=useState(true);
   useEffect(
    ()=>{
       const fetchData=async()=>{
            return await hospitalData.data;
        }
        fetchData().then((data)=>{setHospitalDetail(data.findHospitalById);setIsProcessingHospitalData(false)}).catch(err=>err)
    }
   )
   return {hospitalDetail,isProcessingHospitalData}
}