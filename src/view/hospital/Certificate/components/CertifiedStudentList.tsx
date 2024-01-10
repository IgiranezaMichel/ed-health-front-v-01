import { Button } from "@mui/material"
import { useFindCertifiedStudentByCertificateIdPage } from "../../../../controller/viewHooks/CertifiedStudent/CertifiedStudentDao"
import { useState } from "react";
import { PaginationInput } from "../../../../typeDefs/PaginationInput";

export const CertifiedStudentList=(props:{certificateId:number})=>{
    const [page,setPage]=useState<PaginationInput>({
        pageNumber:0,pageSize:10,sort:"id"
    })
   const certificateObj= useFindCertifiedStudentByCertificateIdPage(props.certificateId,page); 
   console.log(certificateObj)
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
    {
        !certificateObj.isLoading&&<div>
            
        </div>
    }
    </>
)
}