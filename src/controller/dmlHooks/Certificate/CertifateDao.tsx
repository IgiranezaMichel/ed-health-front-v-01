import { useMutation} from "@apollo/client";
import { CertificateInput } from "../../../typeDefs/CertificateInput";
import { REGISTER_CERTIFICATE } from "../../../graphQl/mutation/CertificateMutation";
import { useState } from "react";

export const useRegisterCertificate=(certificate:CertificateInput)=>{
    const [isLoading,setIsLoading]=useState(true);
    const [result,setResult]=useState({
        statusCode:0,message:''
    });
    const [saveCertificate]=useMutation(REGISTER_CERTIFICATE);
    const saveCertificateHandler=()=>{
        saveCertificate({variables:{certificate:certificate}}).then(
            data=>{
                const response=data.data.registerCertificate.split(',');
                setResult({statusCode:Number(response[0].split(' ')[0]),message:response[1]});
                setIsLoading(false);
            }
        )
    }
    return {isLoading,result,saveCertificateHandler}
}