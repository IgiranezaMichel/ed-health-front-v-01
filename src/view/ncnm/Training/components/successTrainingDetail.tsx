/* eslint-disable @typescript-eslint/no-explicit-any */
import { Approval, Email, LocalHospitalOutlined, People, Person, Phone, School } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Avatar, Box, Card, Tab, Tooltip } from "@mui/material"
import { ReactNode, useState } from "react"
import { useFindTrainingById } from "../../../../controller/viewHooks/training/useFindTrainingById";
import { useGetStudentAppliedForTraining } from "../../../../controller/viewHooks/TrainingApplication/trainingApplication";
export const SuccessTrainingDetail = (props: { trainingId: number, children: ReactNode }) => {
    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event;
        setValue(newValue);
    }
    const { studentList, isLoading } = useGetStudentAppliedForTraining(props.trainingId);
    const { isFindingTraining, trainingDetail, trainerList } = useFindTrainingById(props.trainingId);
    console.log(studentList)
    return <>
        {props.children}
        <section>
            {!isFindingTraining && trainingDetail != undefined && <div>
                <Card elevation={4} className="rounded-0 p-2">
                    <div>
                        <img width={'8%'} className="float-end" src={trainingDetail.hospital.logo} alt="" />
                    </div>
                    <div className="mb-3 fw-bold mx-1"> {trainingDetail.title}</div>
                    <div className="mb-3 border-bottom rounded-0 pb-3"><LocalHospitalOutlined /> {trainingDetail.hospital.name}</div>
                    <div className="mb-3">{trainingDetail.description}</div>
                </Card>
            </div>}
        </section>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                    <Tab label={<div><People /> Lecture</div>} value="1" />
                    <Tab label={<div><People /> Applicant</div>} value="2" />
                    <Tab label={<div>Certificate</div>} value="3" />
                </TabList>
            </Box>
            <TabPanel value="1">
                <div className="row col-12 m-auto">
                    {!isFindingTraining && trainerList != undefined && trainerList.length != 0 && trainerList.
                        map((data: any) => {
                            return (
                                <div key={data.id} className="col-sm-4">
                                    <Card className="rounded-0">
                                        <div className="text-center">
                                            <img src={data.profilePicture} height={'120vh'} className="m-auto" />
                                        </div>
                                        <div className="mx-2">
                                            <Person/>{data.name}
                                            <div className="mt-3">
                                               <Phone/> {data.phoneNumber}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )
                        })}
                </div>
            </TabPanel>
            <TabPanel value="2">{
                !isLoading && studentList != undefined && studentList.length != 0 &&
                studentList.map((data:any) => {
                    return <div className="mt-3">
                        <Card key={data.student.user.id} elevation={3} className="row rounded-0 col-12">
                            <section className="col-sm-3 card border-0 p-0 justify-content-center">
                                <div className="d-flex mx-3">
                                <Tooltip arrow color="primary" title={<div>
                                    <img width={'100%'} src={data.student.user.profilePicture} alt="" />
                                </div>}>
                                <Avatar src={data.student.user.profilePicture} />
                                    </Tooltip><div className="card d-flex justify-content-center border-0 mx-2">{data.student.user.name}</div>
                                </div>
                            </section>
                            <div className="col-md-4 card p-0 justify-content-center border-0">
                            <section className="d-flex"><div className="card d-flex justify-content-center border-0 mx-2"><Phone/></div> <div className="card d-flex justify-content-center border-0 mx-2">{data.student.user.phoneNumber}</div></section>
                            <section className="d-flex mt-2"><div className="card d-flex justify-content-center border-0 mx-2"><Email/></div> <div className="card d-flex justify-content-center border-0 mx-2">{data.student.user.email}</div></section>
                            </div>
                            <div className="col-md-5">
                            <section className="d-flex mt-3 mb-3">
                                <section className="d-flex"><div className="card d-flex justify-content-center border-0 mx-2"><School/></div> <div className="card d-flex justify-content-center border-0 mx-2"><b>School</b> {data.student.department.faculty.school.name}</div></section>
                                 <section className="d-flex"><div className="card d-flex justify-content-center border-0 mx-2"><School/></div> <div className="card d-flex justify-content-center border-0 mx-2"><b>Faculty</b> {data.student.department.faculty.name}</div></section>
                                 <section className="d-flex"><div className="card d-flex justify-content-center border-0 mx-2"><School/></div> <div className="card d-flex justify-content-center border-0 mx-2"><b>Department</b> {data.student.department.name}</div></section>
                            </section>
                            <section className="d-flex"><div className="card d-flex justify-content-center border-0 mx-2"><Approval/></div> <div className="card d-flex justify-content-center border-0 mx-2"><b>Approval status</b> {data.hospitalApprovalStatus}</div></section>
                            </div>
                        </Card>

                    </div>
                })
            }
            
            {!isLoading && studentList != undefined && studentList.length == 0 &&<section className="text-center fw-bold">
                -- no data found ---
                </section>}
            </TabPanel>
            <TabPanel value="3">3</TabPanel>
        </TabContext>
    </>
}