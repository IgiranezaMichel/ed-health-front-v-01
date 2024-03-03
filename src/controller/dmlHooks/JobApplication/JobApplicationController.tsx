import { useMutation } from "@apollo/client"
import { REGISTER_JOB_APPLICATION } from "../../../graphQl/mutation/JobApplication"
import { useState } from "react";

export const useRegisterStudentJobApplication=(studentId:number,jobId:number,status:string)=>{
const [saveJobApplication]=useMutation(REGISTER_JOB_APPLICATION);
const [hasFinishLoading,setHasFinishLoading]=useState(false);
const [result,setResult]=useState('');
const saveJobApplicationHandler=async()=>{
await saveJobApplication({variables:{studentId:studentId,jobId:jobId,status:status}})
.then(data=>{setResult(data.data.registerStudentJobApplication);setHasFinishLoading(true)})
.catch(err=>err)
}
return {saveJobApplicationHandler,result,hasFinishLoading}
}