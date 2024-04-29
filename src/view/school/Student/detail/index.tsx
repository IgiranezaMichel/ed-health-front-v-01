import { useMutation } from "@apollo/client";
import {  Check, Email, Phone,WcSharp } from "@mui/icons-material";
import { Avatar, Button, Card, CircularProgress,TextField, Tooltip } from "@mui/material";

import { CalendarIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import { Modal } from "../../../../components/default/Modal";
import useFindStudentById from "../../../../controller/viewHooks/Student/FindStudentById";
import { SAVE_ANNUAL_ACADEMIC_REPORT } from "../../../../graphQl/mutation/AnnualAcademicaReportMutations";
import { AcademicAnnualResultInput } from "../../../../typeDefs/AcademicAnnualResultInput";
import { StudentStatus } from "../../../../enums/StudentStatus";
export const StudentDetail = (props: { id: number }) => {
    const { isLoadingStudentData, studentDetail, refetchStudentDetail } = useFindStudentById(props.id);
    const [annualAcademicResult, setAnnualAcademicResult] = useState<AcademicAnnualResultInput>({
        id: 0,
        studentId: props.id,
    })
    const [saveAnnualReport] = useMutation(SAVE_ANNUAL_ACADEMIC_REPORT);
    const saveAnnualReportHandler = async () => {
        saveAnnualReport({ variables: { input: annualAcademicResult } }).then(data => { alert(data.data.saveAnnualAcademicReport); refetchStudentDetail(); });

    }
    console.log(studentDetail)
    const approveStudent = <Modal id="saveStudentBtn" title="Approve student for course completion"
        actionBtn={<Button className="bg-primary text-white" onClick={() => saveAnnualReportHandler()}>Submit</Button>}>
        <div className="p-2">
            <TextField value={annualAcademicResult.totalMarks}
                onChange={(e) => setAnnualAcademicResult({ ...annualAcademicResult, totalMarks: e.target.value })}
                className="form-control mb-3" type="text" label="Total marks" />
            <TextField value={annualAcademicResult.disciplineMarks}
                onChange={(e) => setAnnualAcademicResult({ ...annualAcademicResult, disciplineMarks: e.target.value })}
                className="form-control" type="text" label="Discipline marks" />
        </div>
    </Modal>
    return (
        <>

            {isLoadingStudentData && <main className="d-flex justify-content-center align-content-center py-5">
                <CircularProgress />
            </main>}
            {!isLoadingStudentData && <main className="m-12 m-auto">
                <Card className="col-sm-12 p-3 rounded-0" elevation={9}>
                    <Tooltip title={<div><img height={'100vh'} src={studentDetail.user.profilePicture}/></div>}>
                    <section className="d-flex">
                    <Avatar className="bg-dark" src={studentDetail.user.profilePicture}/>
                    <div className="card d-flex justify-content-center border-0 mx-3">{studentDetail.user.name}</div>
                    </section>
                    </Tooltip>
                    <div className="p-md-3 d-md-flex">
                        <div className="mx-2"><WcSharp className="border rounded-circle border-dark border-2"/> {studentDetail.user.gender}</div>
                        <div className="mx-2"><Email className="border rounded-circle border-dark border-2" /> {studentDetail.user.email}</div>
                        <div className="mx-2"><Phone className="border rounded-circle border-dark border-2" /> {studentDetail.user.phoneNumber}</div>
                        <div className="mx-2"><CalendarIcon className="border rounded-circle border-dark border-2" /> {String(studentDetail.user.dob).split('T')[0]}</div>
                        <div className="mx-2">Status <b>{studentDetail.status}</b></div>
                    </div>
                    </Card>
                {(studentDetail.status != StudentStatus.DROPOUT && studentDetail.status != StudentStatus.INACTIVE && studentDetail.status != StudentStatus.UNKNOWN) &&
                    <Card elevation={4} className="border border-2 p-2">
                        <b>Mark As he/she has complete   courses</b>
                        <button data-bs-toggle="modal" data-bs-target="#saveStudentBtn" className="bg-success float-end py-1 rounded-circle">
                            <Check className="text-white fs-5 fw-bolder" />
                        </button>
                    </Card>}
            </main>}
            
            {approveStudent}
        </>
    )
}