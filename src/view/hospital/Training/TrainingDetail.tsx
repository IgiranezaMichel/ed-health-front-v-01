/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client";
import { BorderColor, KeyboardArrowDown, KeyboardArrowUp, People, PersonPin, PhoneInTalkOutlined, PlaylistAdd, RemoveRedEye, Save, TitleSharp } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CircularProgress, NativeSelect, Skeleton, Tab, TextField, Tooltip } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HospitalMenu } from "../../../MenuBarItems/HospitalMenu";
import { Navigation } from "../../../components/default/Navigation";
import { useFindTrainingById } from "../../../controller/viewHooks/training/useFindTrainingById";
import { REGISTER_TRAINER } from "../../../graphQl/mutation/TrainerMutations";
import { TrainerInput } from "../../../typeDefs/TrainerInput";
import { CalendarIcon } from "@mui/x-date-pickers";
import { Modal } from "../../../components/default/Modal";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useGetStudentAppliedForTraining } from "../../../controller/viewHooks/TrainingApplication/trainingApplication";
export const HospitalTrainingDetail = () => {
    const { id } = useParams();
    const [isSaving, setIsSaving] = useState(false);
    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event;
        setValue(newValue);
    }
    const [trainer, setTrainer] = useState<TrainerInput>({
        name: '',
        phoneNumber: '',
        profilePicture: '',
        trainingId: Number(id),
        id: 0,
        trainerTitle: '',
        signature: ''
    });
    const [show, setShow] = useState('');
    const [saveTrainer] = useMutation(REGISTER_TRAINER);
    const saveTrainerHandler = () => {
        setIsSaving(true);
        saveTrainer({ variables: { input: trainer } }).then(data => { alert(data); setIsSaving(false); refreshTrainingDetail() }).catch(err => console.log(err))
    }
    const handleProfilePic = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setTrainer({ ...trainer, profilePicture: reader.result as string })
            };
            reader.readAsDataURL(file);
        }
    }
    const handleSignature = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setTrainer({ ...trainer, signature: reader.result as string })
            };
            reader.readAsDataURL(file);
        }
    }
    const { isFindingTraining, applicantList, trainerList, trainingDetail, refreshTrainingDetail } = useFindTrainingById(Number(id));
    const { studentList, isLoading } = useGetStudentAppliedForTraining(Number(id));
    const navigate = useNavigate()
    const addTrainerModal = <Modal
        actionBtn={
            <div>
                {!isSaving ? <Button className="bg-info text-primary mx-1" onClick={() => saveTrainerHandler()}><Save /></Button>
                    : <Button><CircularProgress /></Button>}
            </div>
        }
        id="add-school-admin" title="Add School Admin">
        <div className="p-3">
            <NativeSelect onChange={(e) => setTrainer({ ...trainer, trainerTitle: e.target.value })} className="mb-3 mt-3 w-25">
                <option value="Sir.">Sir</option>
                <option value="Madam.">Madam</option>
                <option value="Mr.">Mister</option>
                <option value="Mrs.">Mistress</option>
                <option value="Dr.">Doctor</option>
                <option value="Pr.">Professor</option>
            </NativeSelect>
            <TextField type="text" value={trainer.name} onChange={(e) => setTrainer({ ...trainer, name: e.target.value })} className="mb-3  w-75" label="Trainer Name" variant="standard" />
            <TextField type="text" value={trainer.phoneNumber} onChange={(e) => setTrainer({ ...trainer, phoneNumber: e.target.value })} className="mb-3 form-control" label="Phone Number" variant="standard" />
            <label htmlFor="">Profile picture</label>
            <input type="file" onChange={handleProfilePic} className="form-control mb-2" />
            <label htmlFor="">Upload Signature</label>
            <input type="file" onChange={handleSignature} className="form-control mb-2" />
        </div>
    </Modal>;
    return (
        <Navigation items={HospitalMenu}>
            {isFindingTraining && <section className="col-5 m-auto">
                <Skeleton className="w-50 d-block bg-primary" />
                <Skeleton className="w-50 d-block bg-primary" />
                <Skeleton className="w-100 d-block bg-primary" />
                <Skeleton className="w-100 d-block bg-primary" />
                <Skeleton className="w-100 d-block bg-primary" />
            </section>}
            {!isFindingTraining &&
                <>
                    <Card elevation={4} className="col-sm-12 row m-auto p-3 rounded-0">
                        <div className="col-md-6">
                            <span className="d-block mb-2"><TitleSharp /> Title: <b>{trainingDetail.title}</b></span>
                            <span className="d-block mb-1"><BorderColor />Approval status: <b>{trainingDetail.ncnmApprovalStatus}</b></span>
                        </div>
                        <div className="col-md-6">
                            <span className="d-block mb-1"><CalendarIcon /> Deadline: <b>{String(trainingDetail.deadline).split('T')[0]}</b></span>
                            <span className="d-block">
                                <span className="fw-bold">
                                    <People />Total Applicant <span className="badge bg-info text-dark">{applicantList.length}</span>
                                    <RemoveRedEye onClick={() => navigate('/hospital/training-applicant-detail/' + id)} className="mx-2" />
                                </span>
                            </span>
                        </div>
                    </Card>
                    <Card className="mt-3 rounded-0" elevation={4}>
                        <TabContext value={value}>
                            <Box sx={{ border: 'none', borderColor: 'divider' }}>
                                <TabList onChange={handleChange}>
                                    <Tab label={<div><PersonPin /> Requirement</div>} value="1" />
                                    <Tab label={<div>
                                        <span className=" btn border-0 position-relative">
                                            <People /> Trainers
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                                {trainerList.length}
                                            </span>
                                        </span>
                                    </div>} value="2" />
                                    <Tab label={<div>
                                        <span className=" btn border-0 position-relative">
                                            <People /> Applicant list
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                                {!isLoading && studentList != undefined && <>{studentList.length}</>}
                                            </span>
                                        </span>
                                    </div>} value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1" className="col-12">

                                <div className="fw-bold italic">Description</div>
                                <div>{trainingDetail.description}</div>
                                <div className="fw-bold italic mb-3 mt-3">Requirement</div>
                                <div dangerouslySetInnerHTML={{ __html: trainingDetail.trainingRequirement }}></div>
                            </TabPanel>
                            <TabPanel value="2">
                                <div>
                                    <span className="fw-bold fs-5 d-block">Trainer</span>
                                    <div className="modal-footer">
                                        <button className="bg-primary p-1 text-light btn">
                                            <PlaylistAdd data-bs-toggle="modal" data-bs-target="#add-school-admin" />
                                        </button>
                                    </div>
                                    <div className="col-12 row m-auto g-1">
                                        {trainerList.map((data: any) => {
                                            return <Card className="p-3 row col-12 m-auto mt-3" elevation={4}>
                                                <section className="col-md-6">
                                                    <section className='d-flex'>
                                                        <Tooltip arrow title={<img src={data.profilePicture} height={'100vh'} />}>
                                                            <Avatar className="bg-black card-img" src={data.profilePicture} />
                                                        </Tooltip>
                                                        <div className="card mx-2 d-flex justify-content-center border-0">
                                                            <div><b>{data.trainerTitle}</b> {data.name}</div>
                                                        </div>
                                                    </section>

                                                </section>
                                                <section className="col-md-3">
                                                    <div className="mt-2 ">
                                                        <PhoneInTalkOutlined />{data.phoneNumber}
                                                    </div>
                                                </section>
                                                <section className="col-md-3">
                                                    <Tooltip title={<div>
                                                        <div><b>{data.trainerTitle}</b> {data.name}</div>
                                                        <div>Signature</div>
                                                    </div>} className="float-end">
                                                        <div><img src={data.signature} height={30} /><br /></div>
                                                    </Tooltip>
                                                </section>
                                            </Card>
                                        })}
                                    </div>
                                    <div className="text-center">
                                        <Button className="text-white" onClick={() => { show == '' ? setShow('trainerList') : setShow('') }}>
                                            {show == 'trainerList' ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                                        </Button>
                                    </div>
                                </div>

                            </TabPanel>
                            <TabPanel value="3">
                                {!isLoading && studentList != undefined && studentList.length != 0 &&
                                    <div >
                                        display something
                                    </div>

                                }
                                {!isLoading && studentList != undefined && studentList.length == 0 &&
                                    <div className="fw-bold text-center p-3">
                                        -- No Applicant data found --
                                    </div>

                                }
                            </TabPanel>
                        </TabContext>
                    </Card>
                </>
            }
            {addTrainerModal}
        </Navigation>
    )
}