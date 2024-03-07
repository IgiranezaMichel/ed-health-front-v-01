import { useState } from "react"
import { useGetCertifiedStudentByAdminApprovalStatus } from "../../../../controller/viewHooks/TrainingApplication/trainingApplication"
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { Card, CircularProgress } from "@mui/material";

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
                            return <Card >
                                <div className="col-sm-2">
                                    <img src={data.student.user.profilePicture} alt="" />
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