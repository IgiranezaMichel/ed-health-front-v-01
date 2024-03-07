/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button} from "@mui/material"
import { CertifiedStudents } from "./CertifiedStudents";
import { CertifiedStatus } from "./CertifiedStatus";
import { useState } from "react";
export const CertifiedStudentList=(props:{certificateId:number,trainingId:number})=>{
    const [status,setStatus]=useState('certificate');
return(
    <>
    <Button onClick={()=>setStatus('certificate')} variant={status=='certificate'?"contained":"outlined"} className="rounded-0 mx-2">
        Certified
    </Button>
    <Button onClick={()=>setStatus('approved')} variant={status=='approved'?"contained":"outlined"} className="rounded-0">
        Appending
    </Button>
    <Button onClick={()=>setStatus('rejected')} variant={status=='rejected'?"contained":"outlined"} className=" mx-1 rounded-0">
        Rejection
    </Button>
   {status=='certificate'&&<CertifiedStudents certificateId={props.certificateId}/>}
   {(status=='approved'||status=='rejected')&&<CertifiedStatus status={status} trainingId={props.trainingId}/>}
    </>
)
}