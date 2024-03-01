import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FIND_JOB_BY_ID, FIND_POSTED_JOBS_PAGE, LIST_OF_POSTED_JOB_BY_HOSPITAL } from "../../graphQl/queries/JobQueries";
import { PaginationInput } from "../../typeDefs/PaginationInput";

export const useGetListOfPostedJobs=(hospitalId:number,input:PaginationInput,status:string)=>{
   const jobPosted= useQuery(LIST_OF_POSTED_JOB_BY_HOSPITAL,{
        variables:{hospitalId:hospitalId,input:input,status:status}
    });
    const [jobPageNumber,setJobPageNumber]=useState(0);
    const [jobSize,setJobSize]=useState(0);
    const [jobTotalPage,setJobTotalPage]=useState(0);
    const[listOfPostedJob,setListOfPostedJob]=useState([]);
    const [jobHasFinishLoading,setJobHasFinishLoading]=useState(false);
    useEffect(
        ()=>{
         const fetchData=async()=>{
           return await jobPosted.data;
         }
         fetchData().then(data=>{
            setJobPageNumber(data.findJobsPostedByHospital.pageNumber);
            setJobSize(data.findJobsPostedByHospital.size);
            setJobTotalPage(data.findJobsPostedByHospital.totalPages);
            setListOfPostedJob(data.findJobsPostedByHospital.content);
            setJobHasFinishLoading(true);
        }).catch(err=>console.log(err))
        }
    )
    return {listOfPostedJob,jobHasFinishLoading,jobPageNumber,jobSize,jobTotalPage};
}

export const useFindJobById=(id:number)=>{
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const [jobDetail,setJobDetail]=useState<any>({});
const [jobDetailIsLoading,setJobDetailIsLoading]=useState(true);
const jobData =useQuery(FIND_JOB_BY_ID,{variables:{id:id}});
useEffect(
    ()=>{
const fetchData=async()=>{
    return await jobData.data;
}
fetchData().then(data=>{setJobDetail(data.findJobById);setJobDetailIsLoading(false)}).catch(err=>console.log(err))
    }
    )
    return {jobDetail,jobDetailIsLoading}
}
export const useFindJobsPostedPage=(input:PaginationInput,status:string)=>{
const {data,refetch}=useQuery(FIND_POSTED_JOBS_PAGE,{variables:{input:input,status:status}});
const [finishLoading,setFinishLoading]=useState(false);
const [jobObj,setJobObj]=useState<any>({});
useEffect(
    ()=>{
       const fetchData=async()=>{
        return await  data;
        }
        fetchData().then((data)=>{setJobObj(data.findJobsPostedPage);setFinishLoading(true)})
        .catch(err=>err)
    }
)
return {refetch,finishLoading,jobObj}
}