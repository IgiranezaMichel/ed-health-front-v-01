import { useMutation } from "@apollo/client"
import { CERTIFY_STUDENT } from "../../../graphQl/mutation/CertifiedStudentMutations"
import { useState } from "react";

export const useSaveCertifyStudent=(trainingApplicationId:number,applicationStatus:string,certifyStudentInput:CertifiedStudentInput)=>{
const [saveCertifyStudent]=useMutation(CERTIFY_STUDENT);
const [message,setMessage]=useState('');
const registerHandler=()=>{
    saveCertifyStudent({variables:{trainingApplicationId:trainingApplicationId,applicationStatus:applicationStatus,certifyStudentInput:certifyStudentInput}})
    .then(data=>setMessage(data.data.certifyStudent))
    .catch(err=>err)
}
return {message,registerHandler}
}