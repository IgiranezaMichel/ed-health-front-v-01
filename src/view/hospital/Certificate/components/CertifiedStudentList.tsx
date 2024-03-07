/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button} from "@mui/material"
import { CertifiedStudents } from "./CertifiedStudents";
import { CertifiedStatus } from "./CertifiedStatus";
import { useState } from "react";
export const CertifiedStudentList=(props:{certificateId:number,trainingId:number})=>{
    const [status,setStatus]=useState('certificate');
return(
    <>
    <Button onClick={()=>setStatus('certificate')} variant="contained" className="rounded-0 mx-2">
        Certified
    </Button>
    <Button onClick={()=>setStatus('approved')} variant="outlined" className="rounded-0">
        Appending
    </Button>
    <Button onClick={()=>setStatus('rejected')} variant="outlined" className=" mx-1 rounded-0">
        Rejection
    </Button>
   <CertifiedStudents certificateId={props.certificateId}/>
   {status==''&&<CertifiedStatus status={status} trainingId={props.trainingId}/>}
    </>
)
}