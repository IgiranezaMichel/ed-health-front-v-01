import { useState } from "react"
import { useGetCertifiedStudentByAdminApprovalStatus } from "../../../../controller/viewHooks/TrainingApplication/trainingApplication"
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { Button, Card, CircularProgress } from "@mui/material";
import { CancelPresentationOutlined, Check, CheckBox, Email, Person, Phone, SaveAlt, Wc } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { Modal } from "../../../../components/default/Modal";
import { useSaveCertifyStudent } from "../../../../controller/dmlHooks/CertifyStudent/CertifyStudentDao";

export const CertifiedStatus = (props: { status: string, trainingId: number }) => {
    const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 10, sort: "id" });
    const [status, setStatus] = useState('');
    const certifiedStudents = useGetCertifiedStudentByAdminApprovalStatus(props.status, props.trainingId, page);

    const certifyStudent=useSaveCertifyStudent(props.trainingId,status,certifyStudentInput);
    console.log(certifiedStudents);
    const addSaveChangesModal = <Modal actionBtn={<SaveAlt/>} id="saveChanges" title="Update application" >
        <div className="p-2">
        Are you sure you want to
        </div>
    </Modal>
    return (
        <>
        <div>
        {addSaveChangesModal}
        </div>
            {
                certifiedStudents.isLoading ? <div>
                    <CircularProgress />
                </div>
                    :
                    <div className="p-2">
                        {certifiedStudents.certifiedStudentDetailObj.content.length == 0 ? <Card elevation={3} className="p-4 text-center fw-bold">
                            --No data found --
                        </Card> : <div className="mt-2 mb-2">
                            {
                                certifiedStudents.certifiedStudentDetailObj.content.map((data: any) => {
                                    return <Card elevation={4} className="row col-12 m-auto mb-3">
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
                                                        <Button data-toggle="modal" data-target="#saveChanges">
                                                        <CheckBox  onClick={() => setStatus('certified')} className="fs-1" />
                                                        </Button>
                                                        <CancelPresentationOutlined data-toggle="modal" data-target="#saveChanges" onClick={() => setStatus('rejected')} className="fs-1" />
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