/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cancel,Email, Person2Outlined, Sort, Wc } from "@mui/icons-material"
import { Card, NativeSelect, Pagination, Stack, Tooltip } from "@mui/material"
import { useFindCertifiedStudentByCertificateIdPage } from "../../../../controller/viewHooks/CertifiedStudent/CertifiedStudentDao";
import { useEffect, useState } from "react";
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { CalendarIcon } from "@mui/x-date-pickers";
import QrCode from "../../../../components/default/QrCode";
import { useSaveCertifyStudent } from "../../../../controller/dmlHooks/CertifyStudent/CertifyStudentDao";
import { CertifiedStudentInput } from "../../../../typeDefs/CertifiedStudentInput";
import { CertificateStatus } from "../../../../enums/CertificateStatus";

export const CertifiedStudents = (props: { certificateId: number }) => {
    const [page, setPage] = useState<PaginationInput>({
        pageNumber: 0, pageSize: 10, sort: "id"
    })
    const certificateObj = useFindCertifiedStudentByCertificateIdPage(props.certificateId, page);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event;
        setPage({ ...page, pageNumber: value - 1 });
    };
    const [trainingApplicationId,setTrainingApplicationId]=useState(0)
    const [certifyStudent, setCertifyStudent] = useState<CertifiedStudentInput>(
        {
            id: 0,
            studentId: 0,
            certificateId: props.certificateId,
            CertificateStatus:CertificateStatus.APPROVED
        });
    useEffect(
        ()=>{

        },[trainingApplicationId]
    )
    const [studentApplicationStatus, setStudentApplicationStatus] = useState('certified');
    const saveCertifyStudent = useSaveCertifyStudent(trainingApplicationId, studentApplicationStatus, certifyStudent);
    //    Register certify Student handler
        const registerCertifyStudent = (studentId:number,trainingApplicationId1:number) => {
            setTrainingApplicationId(trainingApplicationId);
            console.log(studentId+' '+trainingApplicationId1+' '+trainingApplicationId)
            setCertifyStudent({
                CertificateStatus:CertificateStatus.DENY,
                certificateId: props.certificateId,
                id: 0, studentId:studentId
            }
            ); 
            setStudentApplicationStatus('rejected');
            saveCertifyStudent.registerHandler();
        }
    return (
        <>
            {
                !certificateObj.isLoading && <div className="p-2">
                    {
                        certificateObj.studentCertifiedObj.content.length != 0 ?
                            <>
                                <Stack spacing={2} className="mb-4">
                                    <div>  Page {certificateObj.studentCertifiedObj.pageNumber + 1} out of {certificateObj.studentCertifiedObj.totalPages}  <span>
                                        <NativeSelect onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2">
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                        </NativeSelect>
                                    </span>
                                        <span className="float-end">
                                            Sort by <NativeSelect onChange={(e)=>setPage({...page,sort:e.target.value})} className="custom-select p-1">
                                                <option value="id">Select item below</option>
                                                <option value="student.user.name">Name</option>
                                                <option value="student.user.email">Email</option>
                                                <option value="student.school.name">School</option>
                                            </NativeSelect>
                                            <Sort /></span>
                                        <Pagination
                                            count={certificateObj.studentCertifiedObj.totalPages}
                                            page={certificateObj.studentCertifiedObj.pageNumber + 1}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Stack>
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
                                                <div style={{ width: '50px', height: '50px' }}>
                                                    <QrCode url="/student-certificate/" style={{ width: '100%', height: '100%' }} pathVariable={btoa(data.id + '')} />
                                                </div>
                                                <div className="mt-1 modal-footer">
                                                    <Tooltip placement="top" title="Reject certificate">
                                                        <Cancel onClick={() => {
                                                            registerCertifyStudent(Number(data.student.id),Number(data.id));
                                                            }}/>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </section>
                                    </Card>
                                })
                                }
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