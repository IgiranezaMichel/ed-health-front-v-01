import { useState } from "react"
import { useFindCertificateById_ } from "../../../../controller/viewHooks/Certificate/CertificateQueries";

export const CertificateDetail=(props:{certificateId:number})=>{
    const [show,setShow]=useState('');
    const certificate=useFindCertificateById_(props.certificateId);
    return(
        <>
        {certificate.isLoading&&<div>
            
        </div>
            
        }
        </>
    )
}