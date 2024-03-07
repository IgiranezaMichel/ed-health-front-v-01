/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from "@mui/material"
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
        !certificateObj.isLoading&&<div className="p-2">
            {
                certificateObj.studentCertifiedObj.content.length!=0?
                <>
                    {certificateObj.studentCertifiedObj.content.map((data:any,index:number)=>{
                        return <Card elevation={3} key={index} className="mb-3 col-sm-12 row m-auto">
                            <div className="col-sm-4">
                            <img src={data.student.user.profilePicture} height={100} />
                            </div>
                        </Card>
                    })}
                </>:
                <div className="p-3 text-center border fw-bold">
                -- No certified student found --
                </div>
            }
        </div>
    }
    </>
)
}