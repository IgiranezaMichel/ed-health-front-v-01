import { useState } from "react"
import { useGetCertifiedStudentByAdminApprovalStatus } from "../../../../controller/viewHooks/TrainingApplication/trainingApplication"

export const CertifiedStatus=(props:{status:string,trainingId:long})=>{
   const certifiedStudent=useGetCertifiedStudentByAdminApprovalStatus()
    return(
        <>
        
        </>
    )
}