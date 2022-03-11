import { useMutation } from "@apollo/client"
import { CERTIFY_STUDENT } from "../../../graphQl/mutation/CertifiedStudentMutations"
import { useState } from "react";
import { CertifiedStudentInput } from "../../../typeDefs/CertifiedStudentInput";
import { CertificateStatus } from "../../../enums/CertificateStatus";

export const useSaveCertifyStudent=(trainingApplicationId:number,applicationStatus:CertificateStatus,certifyStudentInput:CertifiedStudentInput)=>{
const [saveCertifyStudent]=useMutation(CERTIFY_STUDENT);
const [message,setMessage]=useState('');
const [isLoading,setIsLoading]=useState(true);
const registerHandler=()=>{
    saveCertifyStudent({variables:{trainingApplicationId:trainingApplicationId,applicationStatus:applicationStatus,certifyStudentInput:certifyStudentInput}})
    .then(data=>{setMessage(data.data.certifyStudent);setIsLoading(false)})
    .catch(err=>err)
}
return {message,registerHandler,isLoading}
}