import { useState } from "react"
import { useGetCertifiedStudentByAdminApprovalStatus } from "../../../../controller/viewHooks/TrainingApplication/trainingApplication"
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { Card, CircularProgress } from "@mui/material";
import { Email, Person, Phone, Wc } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";

export const CertifiedStatus=(props:{status:string,trainingId:number})=>{
    const [page,setPage]=useState<PaginationInput>({pageNumber:0,pageSize:10,sort:"id"});
   const certifiedStudents=useGetCertifiedStudentByAdminApprovalStatus(props.status,props.trainingId,page);
   console.log(certifiedStudents);
    return(
        <>
        {
            certifiedStudents.isLoading?<div>
                <CircularProgress/>
            </div>
            :
            <div className="p-2">
                {certifiedStudents.certifiedStudentDetailObj.content.length==0?<Card elevation={3} className="p-4 text-center fw-bold">
                        --No data found --
                </Card>:<div>
                    {
                        certifiedStudents.certifiedStudentDetailObj.content.map((data:any)=>{
                            return <Card className="row col-12 m-auto">
                                <div className="col-sm-2 d-flex align-content-center align-items-center">
                                    <img src={data.student.user.profilePicture} className="card-img" />
                                </div>
                                <div className="col-md-5 d-flex align-items-center">
                                    <div>
                                    <div className="mb-2"><Person/> {data.student.user.name}</div>
                                    <div className="mb-2"><Email/> {data.student.user.email}</div>
                                    <div className="mb-2"><Wc/> {data.student.user.gender}</div>
                                    <div className="mb-2"><Phone/> {data.student.user.phoneNumber}</div>
                                    <div className="mb-2"><CalendarIcon/> {String(data.student.user.dob).split('T')[0]}</div>
                                    </div>

                                </div>
                            </Card>
                        })
                    }
                    </div>}
            </div>
        }
        </>
    )
}