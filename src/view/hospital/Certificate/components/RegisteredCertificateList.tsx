/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CircularProgress, Divider } from "@mui/material"
import { useFindCertificateByTrainingId_ } from "../../../../controller/viewHooks/Certificate/CertificateQueries";
import { RemoveRedEyeRounded } from "@mui/icons-material";
import { useState } from "react";
export const RegisteredCertificateList = (props: { trainingId: number }) => {
    const certificateList = useFindCertificateByTrainingId_(props.trainingId);
    const[certificateId,setCertificateId]=useState(0);
    return <>
        {certificateId==0&&<>
            {certificateList.isLoading ? <div className="fw-bold p-4 text-center">
                <CircularProgress />
            </div> : <>
                {
                    certificateList.certificateList.map((data: any) => {
                        return <Card elevation={4} className="border m-2 p-2">
                            <div className="fs-4 fw-bold" style={{ fontFamily: 'cursive' }}>Certificate {data.title}</div>
                            <div>
                                <span style={{ fontFamily: 'fantasy', fontWeight: 'lighter' }}>Total certified Person</span> <span className="badge bg-info text-dark fw-bold">{data.certifiedStudentList.length}</span>
                            </div>
                            <div className="text-md-end">
                                <span style={{ fontWeight: 'lighter' }}>{String(data.timeStamp).split('T')[0]} {String(data.timeStamp).split('T')[1].split('.')[0]}</span>
                            </div>
                            <Divider />
                            Approved by <b>{data.accountHolder.name}</b>
                            <div className="modal-footer">
                                <RemoveRedEyeRounded onClick={()=>setCertificateId(Number(data.id))}/>
                            </div>
                        </Card>
                    })
                }
            </>}
        </>}
    </>
}