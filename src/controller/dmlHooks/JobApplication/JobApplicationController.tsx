import { useMutation } from "@apollo/client"
import { CHANGE_JOB_APPLICATION_STATUS_BY_HOSPITAL_ADMIN, REGISTER_JOB_APPLICATION } from "../../../graphQl/mutation/JobApplication"
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

export const useChangeJobApplicantStatusByHospitalAdmin=(id:number,status:string)=>{
    const [saveChange]=useMutation(CHANGE_JOB_APPLICATION_STATUS_BY_HOSPITAL_ADMIN);
    const [hasFinishLoading,setHasFinishLoading]=useState(false);
    const [result,setResult]=useState('');
    const saveJobApplicationStatusHandler=async()=>{
    await saveChange({variables:{id:id,status:status}})
    .then(data=>{setResult(data.data.changeJobApplicantStatusByHospitalAdmin);setHasFinishLoading(true)})
    .catch(err=>err)
    }
    return {saveJobApplicationStatusHandler,result,hasFinishLoading}
}