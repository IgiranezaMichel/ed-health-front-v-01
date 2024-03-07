import { useState } from "react"
import { useGetCertifiedStudentByAdminApprovalStatus } from "../../../../controller/viewHooks/TrainingApplication/trainingApplication"
import { PaginationInput } from "../../../../typeDefs/PaginationInput";

export const CertifiedStatus=(props:{status:string,trainingId:number})=>{
    const [page,setPage]=useState<PaginationInput>({pageNumber:0,pageSize:10,sort:"id"});
   const certifiedStudents=useGetCertifiedStudentByAdminApprovalStatus(props.status,props.trainingId,page);
    return(
        <>
        {
            certifiedStudents.isLoading&&<div>
                
            </div>
        }
        </>
    )
}