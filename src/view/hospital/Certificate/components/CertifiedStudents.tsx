/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cancel, Email, Person2Outlined, Wc } from "@mui/icons-material"
import { Button, Card, Tooltip } from "@mui/material"
import { useFindCertifiedStudentByCertificateIdPage } from "../../../../controller/viewHooks/CertifiedStudent/CertifiedStudentDao";
import { useState } from "react";
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { CalendarIcon } from "@mui/x-date-pickers";
import QrCode from "../../../../components/default/QrCode";

export const CertifiedStudents = (props: { certificateId: number }) => {
    const [page, setPage] = useState<PaginationInput>({
        pageNumber: 0, pageSize: 10, sort: "id"
    })
    const certificateObj = useFindCertifiedStudentByCertificateIdPage(props.certificateId, page);
    console.log(certificateObj)
    return (
        <>
            {
                !certificateObj.isLoading && <div className="p-2">
                    {
                        certificateObj.studentCertifiedObj.content.length != 0 ?
                            <>
                                {certificateObj.studentCertifiedObj.content.map((data: any, index: number) => {
                                    return <Card elevation={3} key={index} className="mb-3 col-sm-12 row m-auto">
                                        <section className="col-md-2 d-flex align-items-center">
                                            <img src={data.student.user.profilePicture} className="card-img" />
                                        </section>
                                        <section className="col-md-6 d-flex align-items-center">
                                            <div>
                                                <div className="mb-2"><Person2Outlined /> {data.student.user.name}</div>
                                                <div className="mb-2"><Wc /> {data.student.user.gender}</div>
                                                <div className="mb-2"><Email /> {data.student.user.email}</div>
                                                <div className="mb-2"><Wc /> {data.student.user.phoneNumber}</div>
                                                <div className="mb-2"><CalendarIcon /> {String(data.student.user.dob).split('T')[0]}</div>
                                            </div>
                                        </section>
                                        <section className="col-md-4 d-flex align-items-center">
                                            <div>
                                                <div className="mb-2"><span style={{ fontFamily: 'fantasy' }}>Study at </span> {data.student.school.name}</div>
                                                <div className="mb-2"><span style={{ fontFamily: 'fantasy' }}>Department</span> {data.student.department.name}</div>
                                                <div style={{width:'50px',height:'50px'}}>
                                                    <QrCode url="/student-certificate/" style={{width:'100%',height:'100%'}} certificateId={Number(data.id)}/>
                                                </div>
                                            </div>
                                        </section>
                                        <div className="modal-footer p-2">
                                            <Tooltip placement="top" title="Reject certificate">
                                            <Button><Cancel/></Button>
                                            </Tooltip>
                                        </div>
                                    </Card>
                                })}
                            </> :
                            <div className="p-3 text-center border fw-bold">
                                -- No certified student found --
                            </div>
                    }
                </div>
            }
        </>
    )
}