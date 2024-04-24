import { useMutation } from "@apollo/client";
import { Autorenew, BookOnline, Close, CollectionsBookmark, Person, PersonPin, Phone, School, Wc, Work } from "@mui/icons-material";
import { Box, Button, Dialog, Tab, TextField } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab"

import { CalendarIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import { Modal } from "../../../../components/default/Modal";
import useFindStudentById from "../../../../controller/viewHooks/Student/FindStudentById";
import { SAVE_ANNUAL_ACADEMIC_REPORT } from "../../../../graphQl/mutation/AnnualAcademicaReportMutations";
import { AcademicAnnualResultInput } from "../../../../typeDefs/AcademicAnnualResultInput";
import { UserDetail } from "./userDetail";
export const StudentDetail = (props: { id: number }) => {
    const { isLoadingStudentData, studentDetail, refetchStudentDetail } = useFindStudentById(props.id);
    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }
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

            {/* {isLoadingStudentData && <main className="d-flex justify-content-center align-content-center py-5">
                <CircularProgress />
            </main>}
            {!isLoadingStudentData && <main className="my-5 row m-12 m-auto">
                <Card className="col-sm-6 rounded-0" elevation={9}>
                    <img src={studentDetail.user.profilePicture} className="card-img" />
                </Card>
                <Card className="col-sm-6 rounded-0 d-flex justify-content-center align-items-center align-content-center" elevation={9}>
                    <div className="p-md-3">
                        <div className="my-2"><Person2Sharp /> {studentDetail.user.name}</div>
                        <div className="my-2"><Person2Sharp /> {studentDetail.user.gender}</div>
                        <div className="my-2"><Email /> {studentDetail.user.email}</div>
                        <div className="my-2"><Phone /> {studentDetail.user.phoneNumber}</div>
                        <div className="my-2"><CalendarIcon /> {String(studentDetail.user.dob).split('T')[0]}</div>
                        <div className="my-2">Status <b>{studentDetail.status}</b></div>
                    </div>
                </Card>
                {(studentDetail.status != StudentStatus.DROPOUT && studentDetail.status != StudentStatus.INACTIVE && studentDetail.status != StudentStatus.UNKNOWN) &&
                    <Card elevation={4} className="border border-2 p-2">
                        <b>Mark As he/she has complete   courses</b>
                        <Button data-bs-toggle="modal" data-bs-target="#saveStudentBtn" className="bg-success float-end">
                            <Check className="text-white fs-3 fw-bolder" />
                        </Button>
                    </Card>}
            </main>}
            
            {approveStudent} */}
                            <Box sx={{ width: '100%' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label={<PersonPin/>} value="1" />
                                <Tab label={<Work/>} value="2" />
                                <Tab label={<CollectionsBookmark/>} value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><UserDetail/></TabPanel>
                        <TabPanel value="2"><Work/></TabPanel>
                        <TabPanel value="3"><Work/></TabPanel>
                    </TabContext>
                </Box>
        </>
    )
}