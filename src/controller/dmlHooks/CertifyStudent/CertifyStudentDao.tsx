import { useMutation } from "@apollo/client"
import { CERTIFY_STUDENT } from "../../../graphQl/mutation/CertifiedStudentMutations"
import { useState } from "react";
import { CertifiedStudentInput } from "../../../typeDefs/CertifiedStudentInput";

export const useSaveCertifyStudent=(trainingApplicationId:number,applicationStatus:string,certifyStudentInput:CertifiedStudentInput)=>{
const [saveCertifyStudent]=useMutation(CERTIFY_STUDENT);
const [message,setMessage]=useState('');
const [isLoading,setIsLoading]=useState(true);
const registerHandler=()=>{
    saveCertifyStudent({variables:{trainingApplicationId:trainingApplicationId,applicationStatus:applicationStatus,certifyStudentInput:certifyStudentInput}})
    .then(data=>{setMessage(data.data.certifyStudent);
        console.log(data.data)
        setIsLoading(false)})
    .catch(err=>console.log(err))
}
return {message,registerHandler,isLoading}
}