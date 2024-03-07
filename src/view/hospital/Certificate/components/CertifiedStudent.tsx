import { Email, Person2Outlined, Wc } from "@mui/icons-material"
import { Card } from "@mui/material"
import { useFindCertifiedStudentByCertificateIdPage } from "../../../../controller/viewHooks/CertifiedStudent/CertifiedStudentDao";
import { useState } from "react";
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { CalendarIcon } from "@mui/x-date-pickers";

export const CertifiedStudent=(props:{certificateId:number})=>{
    const [page,setPage]=useState<PaginationInput>({
        pageNumber:0,pageSize:10,sort:"id"
    })
    const certificateObj= useFindCertifiedStudentByCertificateIdPage(props.certificateId,page); 
   console.log(certificateObj)
    return(
        <>
         {
        !certificateObj.isLoading&&<div className="p-2">
            {
                certificateObj.studentCertifiedObj.content.length!=0?
                <>
                    {certificateObj.studentCertifiedObj.content.map((data:any,index:number)=>{
                        return <Card elevation={3} key={index} className="mb-3 col-sm-12 row m-auto">
                            <div className="col-sm-2">
                            <img src={data.student.user.profilePicture} height={100} />
                            </div>
                            <div className="col-sm-8">
                           <div className="mb-2"><Person2Outlined/> {data.student.user.name}</div>
                           <div className="mb-2"><Wc/> {data.student.user.gender}</div>
                           <div className="mb-2"><Email/> {data.student.user.email}</div>
                           <div className="mb-2"><Wc/> {data.student.user.phoneNumber}</div>
                           <div className="mb-2"><CalendarIcon/> {String(data.student.user.dob).split('T')[0]}</div>
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