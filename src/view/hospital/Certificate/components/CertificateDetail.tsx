import { useState } from "react"
import { useFindCertificateById_ } from "../../../../controller/viewHooks/Certificate/CertificateQueries";
import { Card, CircularProgress} from "@mui/material";

export const CertificateDetail=(props:{certificateId:number})=>{
    const [show,setShow]=useState('');
    const certificate=useFindCertificateById_(props.certificateId);
    return(
        <>
        {certificate.isLoading?<div>
            <CircularProgress/>
        </div>:
        <></>
        }
        </>
    )
}