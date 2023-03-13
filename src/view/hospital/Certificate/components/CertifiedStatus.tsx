/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useGetCertifiedStudentByAdminApprovalStatus } from "../../../../controller/viewHooks/TrainingApplication/trainingApplication"
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { Button, Card, CircularProgress, Pagination, Stack } from "@mui/material";
import { CancelPresentationOutlined, CheckBox, Email, Person, Phone, Sort, Wc } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { useSaveCertifyStudent } from "../../../../controller/dmlHooks/CertifyStudent/CertifyStudentDao";
import { CertifiedStudentInput } from "../../../../typeDefs/CertifiedStudentInput";
import { CertificateStatus } from "../../../../enums/CertificateStatus";

export const CertifiedStatus = (props: { status: string, trainingId: number, certificateId: number }) => {
    const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 10, sort: "id" });
    const [studentApplicationStatus, setStudentApplicationStatus] = useState('certified');
    //retrieve list of certified person according to the status provided
    const certifiedStudents = useGetCertifiedStudentByAdminApprovalStatus(props.status, props.trainingId, page);
    // certifying student hook
    const [trainingApplicationId,setTrainingApplicationId]=useState(0)
    const [certifyStudent, setCertifyStudent] = useState<CertifiedStudentInput>(
        {
            id: 0,
            studentId: 0,
            certificateId: props.certificateId,
            CertificateStatus:CertificateStatus.APPROVED
        });
    const saveCertifyStudent = useSaveCertifyStudent(trainingApplicationId, studentApplicationStatus, certifyStudent);
//    Register certify Student handler
    const registerCertifyStudent = () => {
        saveCertifyStudent.registerHandler();
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event;
        setPage({ ...page, pageNumber: value - 1 });
    };
    return (
        <>
            {
                certifiedStudents.isLoading ? <div>
                    <CircularProgress />
                </div>
                    :
                    <div className="p-2">
                        {certifiedStudents.certifiedStudentDetailObj.content.length == 0 ? <Card elevation={3} className="p-4 text-center fw-bold">
                            --No data found --
                        </Card> : <div className="mt-2 mb-2">
                        <Stack spacing={2} className="mb-4 mt-4">
                                    <div>  Page {certifiedStudents.certifiedStudentDetailObj.pageNumber + 1} out of {certifiedStudents.certifiedStudentDetailObj.totalPages}  <span>
                                        <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2">
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                        </select>
                                    </span>
                                        <span className="float-end">
                                            Sort by <select onChange={(e)=>setPage({...page,sort:e.target.value})} className="custom-select p-1">
                                                <option value="id">Select item below</option>
                                                <option value="student.user.name">Name</option>
                                                <option value="student.user.email">Email</option>
                                                <option value="student.school.name">School</option>
                                            </select>
                                            <Sort /></span>
                                        <Pagination
                                            count={certifiedStudents.certifiedStudentDetailObj.totalPages}
                                            page={certifiedStudents.certifiedStudentDetailObj.pageNumber + 1}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Stack>
                            {
                                certifiedStudents.certifiedStudentDetailObj.content.map((data: any, index: number) => {
                                    return <Card elevation={4} key={index} className="row col-12 m-auto mb-3">
                                        <section className="col-sm-2 d-flex align-content-center align-items-center">
                                            <img src={data.student.user.profilePicture} className="card-img" />
                                        </section>
                                        <section className="col-md-5 d-flex align-items-center">
                                            <div>
                                                <div className="mb-2"><Person /> {data.student.user.name}</div>
                                                <div className="mb-2"><Email /> {data.student.user.email}</div>
                                                <div className="mb-2"><Wc /> {data.student.user.gender}</div>
                                                <div className="mb-2"><Phone /> {data.student.user.phoneNumber}</div>
                                                <div className="mb-2"><CalendarIcon /> {String(data.student.user.dob).split('T')[0]}</div>
                                            </div>
                                        </section>
                                        <section className="col-md-5 d-flex align-items-center">
                                            <div>
                                                <ul>
                                                    <li className="mb-2 nav-link">
                                                        <span style={{ fontFamily: 'fantasy' }}>School Name </span>{data.student.school.name}
                                                    </li>
                                                    <li className="mb-2 nav-link">
                                                        <span style={{ fontFamily: 'fantasy' }}>Department </span>{data.student.department.name}
                                                    </li>
                                                    <li className="nav-link modal-footer">
                                                        <Button>
                                                            <CheckBox onClick={() => {
                                                                setCertifyStudent({
                                                                    CertificateStatus:CertificateStatus.APPROVED,
                                                                    certificateId: props.certificateId,
                                                                    id: 0, studentId: Number(data.student.id)
                                                                }
                                                                );setTrainingApplicationId(Number(data.id)); 
                                                                setStudentApplicationStatus('certified'); 
                                                                registerCertifyStudent()
                                                            }} className="fs-1" />
                                                        </Button>
                                                        <CancelPresentationOutlined onClick={() => {
                                                                setCertifyStudent({
                                                                    CertificateStatus:CertificateStatus.DENY,
                                                                    certificateId: props.certificateId,
                                                                    id: 0, studentId: Number(data.student.id)
                                                                }
                                                                );setTrainingApplicationId(Number(data.id)); 
                                                                setStudentApplicationStatus('rejected'); 
                                                                registerCertifyStudent()
                                                            }} className="fs-1" />
                                                    </li>
                                                </ul>
                                            </div>
                                        </section>
                                    </Card>
                                })
                            }
                        </div>}
                    </div>
            }
        </>
    )
}