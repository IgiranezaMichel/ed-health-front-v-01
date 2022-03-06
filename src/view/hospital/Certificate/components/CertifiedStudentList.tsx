/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button} from "@mui/material"
import { CertifiedStudents } from "./CertifiedStudents";
import { CertifiedStatus } from "./CertifiedStatus";
import { useState } from "react";
export const CertifiedStudentList=(props:{certificateId:number,trainingId:number})=>{
    const [status,setStatus]=useState('approved');
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
   <CertifiedStudents certificateId={props.certificateId}/>
   <CertifiedStatus status={status} trainingId={}/>
    </>
)
}