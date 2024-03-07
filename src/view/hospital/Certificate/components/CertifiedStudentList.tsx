/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button} from "@mui/material"
import { useFindCertifiedStudentByCertificateIdPage } from "../../../../controller/viewHooks/CertifiedStudent/CertifiedStudentDao"
import { useState } from "react";
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { CertifiedStudent } from "./CertifiedStudent";

export const CertifiedStudentList=(props:{certificateId:number})=>{
    
return(
    <>
    <Button variant="contained" className="rounded-0 mx-2">
        Certified
    </Button>
    <Button variant="outlined" className="rounded-0">
        Appending
    </Button>
    <Button variant="outlined" className=" mx-1 rounded-0">
        Rejection
    </Button>
   <CertifiedStudent certificateId={props.certificateId}/>
    </>
)
}