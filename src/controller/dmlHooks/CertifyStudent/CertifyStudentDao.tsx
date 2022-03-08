import { useMutation } from "@apollo/client"
import { CERTIFY_STUDENT } from "../../../graphQl/mutation/CertifiedStudentMutations"

export const useSaveCertifyStudent=(trainingApplicationId:number,applicationStatus:string,certifyStudentInput:CertifiedStudentInput)=>{
const [saveCertifyStudent]=useMutation(CERTIFY_STUDENT);
const registerHandler=()=>{
    saveCertifyStudent({variables:{trainingApplicationId:trainingApplicationId,applicationStatus:applicationStatus,certifyStudentInput:certifyStudentInput}})
}
}