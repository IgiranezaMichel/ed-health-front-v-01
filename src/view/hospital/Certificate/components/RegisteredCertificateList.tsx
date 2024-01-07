/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CircularProgress, Divider } from "@mui/material"
import { useFindCertificateByTrainingId_ } from "../../../../controller/viewHooks/Certificate/CertificateQueries";
export const RegisteredCertificateList = (props: { trainingId: number }) => {
    const certificateList=useFindCertificateByTrainingId_(props.trainingId);
    console.log(certificateList.certificateList)
    return <>
        <>
            {certificateList.isLoading?<div className="fw-bold p-4 text-center">
                <CircularProgress/>
            </div>:<>
            {
                certificateList.certificateList.map((data:any)=>{
                    return <Card elevation={4} className="border m-2">
                       <div>Certificate {data.title}</div>
                       <Divider/>
                       has been approved by {data.accountHolder.name}
                       <div className="modal-footer">
                        
                       </div>
                    </Card>
                })
            }
            </>}
        </>
    </>
}