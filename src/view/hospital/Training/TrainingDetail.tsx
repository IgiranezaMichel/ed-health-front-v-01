/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client";
import { BorderColor,CancelPresentation, CheckBox, CheckCircleOutlineOutlined, CloseRounded, Email, LocalHospital, Person, PhoneInTalkOutlined, PlaylistAdd, RemoveRedEye, Save, School, TitleSharp } from "@mui/icons-material";
import { Button, Card, CircularProgress, Divider, Skeleton, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { HospitalMenu } from "../../../MenuBarItems/HospitalMenu";
import { Navigation } from "../../../components/default/Navigation";
import { Toast } from "../../../components/default/Toast";
import { useFindTrainingById } from "../../../controller/viewHooks/training/useFindTrainingById";
import { REGISTER_TRAINER } from "../../../graphQl/mutation/TrainerMutations";
import { SAVE_TRAINING_REQUIREMENT } from "../../../graphQl/mutation/TrainingRequirementMutation";
import { ToastProps } from "../../../typeDefs/ToastProps";
import { TrainerInput } from "../../../typeDefs/TrainerInput";
import { TrainingRequirementInput } from "../../../typeDefs/TrainingRequirementInput";
import { CalendarIcon, ClockIcon } from "@mui/x-date-pickers";
import { Modal } from "../../../components/default/Modal";
import { useGetTrainingApplicantPage } from "../../../controller/viewHooks/TrainingApplication/trainingApplication";
import { STATUS } from "../../../enums/Status";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
export const HospitalTrainingDetail = () => {
    const { id } = useParams();
    const [add, setAdd] = useState(false);
    const [addShowData, setShowData] = useState('requirement');
    const [isSaving, setIsSaving] = useState(false);
    const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 10, sort: "id" });
    const [trainingRequirement, setTrainingRequirement] = useState<TrainingRequirementInput>({
        description: '',
        id: 0,
        trainingId: Number(id)
    });
    const [trainer, setTrainer] = useState<TrainerInput>({
        name: '',
        phoneNumber: '',
        profilePicture: '',
        trainingId: Number(id),
        id: 0,
        trainerTitle: '',
        signature: ''
    });
    const [message, setMessage] = useState('');
    const [toastProps, setToastProps] = useState<ToastProps>({ message: message, open: false, severity: 'success' });
    const [saveTraining] = useMutation(SAVE_TRAINING_REQUIREMENT);
    const [saveTrainer] = useMutation(REGISTER_TRAINER);
    const saveTrainingRequirementHandler = () => {
        saveTraining({ variables: { input: trainingRequirement } })
            .then(data => {
                setMessage(data.data.saveTrainingRequirement);
                alert(message);
                refreshTrainingDetail();
                setToastProps({ open: true, message: message, severity: 'success' })
            }).catch(err => err);
    }
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
    const { isFindingTraining, applicantList, trainerList, trainingDetail, trainingRequirementList, refreshTrainingDetail } = useFindTrainingById(Number(id));
    const trainingApplicantObj = useGetTrainingApplicantPage(STATUS.APPENDING, Number(id), page);
    console.log(trainingApplicantObj)
    const addTrainerModal = <Modal
        actionBtn={
            <div>
                {!isSaving ? <Button className="bg-info text-primary mx-1" onClick={() => saveTrainerHandler()}><Save /></Button>
                    : <Button><CircularProgress /></Button>}
            </div>
        }
        id="add-school-admin" title="Add School Admin">
        <div className="p-3">
            <select onChange={(e) => setTrainer({ ...trainer, trainerTitle: e.target.value })} className="mb-3 p-3 w-25" name="" id="">
                <option value="Sir.">Sir</option>
                <option value="Madam.">Madam</option>
                <option value="Mr.">Mister</option>
                <option value="Mrs.">Mistress</option>
                <option value="Dr.">Doctor</option>
                <option value="Pr.">Professor</option>
            </select>
            <TextField type="text" value={trainer.name} onChange={(e) => setTrainer({ ...trainer, name: e.target.value })} className="mb-3  w-75" label="Trainer Name" />
            <TextField type="text" value={trainer.phoneNumber} onChange={(e) => setTrainer({ ...trainer, phoneNumber: e.target.value })} className="mb-3 form-control" label="Phone Number" />
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
                <Card className="container-lg p-3 row mt-5 m-auto" elevation={3}>
                    <Card elevation={4} className="col-sm-5 border-4 border-top border-primary">
                        <div className="text-center">
                            <span className="bg-primary p-2 text-light fw-bold"><LocalHospital /><span>{trainingDetail.hospital.name}</span></span>
                        </div>
                        <img src={trainingDetail.hospital.logo} />
                        <span className="d-block mb-3"><TitleSharp /> {trainingDetail.hospital.description}</span>
                        <span className="d-block mb-3"><ClockIcon /> {String(trainingDetail.hospital.timeStamp).split('T')[0]}</span>
                        <Button disableElevation={false} variant="contained" className="bg-primary rounded-4 text-white fw-bold">
                            Total Applicant <span className="badge bg-info text-dark">{applicantList.length}</span>
                            <RemoveRedEye onClick={() => setShowData('applicant')} className="mx-2" />
                        </Button>
                        <Button disableElevation={false} variant="contained" className="bg-primary mt-2 rounded-4 text-white fw-bold">
                            Total requirement <span className="badge bg-info text-dark">{trainingRequirementList.length}</span>
                            <RemoveRedEye onClick={() => setShowData('requirement')} className="mx-2" />
                        </Button>
                    </Card>
                    <section className="col-sm-7 m-auto bg-primary p-2 text-light">
                        <span className="d-block mb-2"><TitleSharp /> Title: <b>{trainingDetail.title}</b></span>
                        <span className="d-block mb-1"><BorderColor /> <b>{trainingDetail.description}</b></span>
                        <span className="d-block mb-1"><CalendarIcon /> Deadline: <b>{String(trainingDetail.deadline).split('T')[0]}</b></span>
                        <span className="d-block">Post Date: <b>{trainingDetail.timeStamp}</b></span>
                        <div className=" border-top border-4">
                            <span className="fw-bold fs-5 d-block">Trainer</span>
                            <div className="modal-footer">
                                <PlaylistAdd data-bs-toggle="modal" data-bs-target="#add-school-admin" className="bg-primary p-1 fs-1 text-light rounded-circle" />
                            </div>
                            <div className="col-12 row m-auto g-1">
                                {trainerList.map((data: any) => {
                                    return <section className="col-sm-4 p-0">
                                        <Card className="p-0" elevation={4}>
                                            <img src={data.profilePicture} style={{ height: '150px', width: '100%', objectFit: 'contain' }} alt="" />
                                            <div className="card-body">
                                                <div className="card-title px-1">
                                                    <b>{data.trainerTitle}</b> {data.name}
                                                    <div className="mt-2 ">
                                                        <PhoneInTalkOutlined />{data.phoneNumber}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </section>
                                })}
                            </div>
                        </div>
                    </section>

                    {addTrainerModal}

                    {/* requirements */}
                    {addShowData == 'requirement' ? <div className="accordion accordion-flush py-2 border bg-primary col-sm-12 m-auto" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                                <button className="accordion-button fw-bolder bg-primary text-white collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                                    Training Requirements
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body py-5">
                                    <ol>
                                        {
                                            trainingRequirementList.map((data: any) => {
                                                return <li key={data.id}>
                                                    {data.description}
                                                </li>
                                            })
                                        }
                                    </ol>
                                    {add && <div>
                                        <input type="text" onChange={(e) => setTrainingRequirement({ ...trainingRequirement, description: e.target.value })} className="p-1 w-75" />
                                        <CheckCircleOutlineOutlined onClick={() => saveTrainingRequirementHandler()} className="text-success mx-1" /> <CloseRounded className="mx-1" onClick={() => setAdd(false)} />
                                    </div>}
                                    <PlaylistAdd className="float-end fs-2" onClick={() => setAdd(true)} style={{ clear: 'both' }} />
                                </div>
                            </div>
                        </div>
                    </div> : <div className="bg-primary">
                        <span className="fs-4 text-white fw-bold">Applicant list</span>
                        
                        <div className="col-sm-12 m-auto py-4">
                            <Button className="">
                                New Applicant
                            </Button>
                            {
                                !trainingApplicantObj.isLoadingApplicant && trainingApplicantObj.trainingApplicants.content.map((data: any) => {
                                    return <div className="12">
                                        <Card className="rounded-0 row col-sm-12 m-auto">
                                            <Card className="col-sm-4">
                                                <img src={data.student.user.profilePicture} className="card-img" alt={data.profilePicture} />
                                            </Card>
                                            <div className="col-sm-8">
                                                <div className="mb-2">
                                                    <Person />{data.student.user.name}
                                                </div>
                                                <div className="mb-2">
                                                    <PhoneInTalkOutlined />{data.student.user.phoneNumber}
                                                </div>
                                                <div className="mb-2">
                                                    <Email />{data.student.user.email}
                                                </div>
                                                <Divider className="border border-2 border-primary-subtle"/>
                                                <div className="mb-2">
                                                    <School />{data.student.school.name}
                                                </div>
                                                <div className="mb-2">
                                                <b style={{fontFamily:'fantasy'}}>Location </b>{data.student.school.location.Location.Location.name} || {data.student.school.location.Location.name} || {data.student.school.location.name}
                                                </div>
                                                <div className="mb-2">
                                                <b style={{fontFamily:'fantasy'}}>Department </b>{data.student.department.name}
                                                </div>
                                                <div className="mb-2">
                                                    <b style={{fontFamily:'fantasy'}}>Status </b>{data.student.status}
                                                </div>
                                                <div className="">
                                                <span className="float-md-end"><CheckBox/> <CancelPresentation/></span>
                                            </div>
                                            </div>
                                        </Card>
                                    </div>
                                })
                            }
                        </div>
                        {applicantList.length == 0 && <div className="p-2 bg-primary text-white text-center fw-bold">
                            -- No Applicant data found --
                        </div>}
                    </div>}

                </Card>}

            <Toast message={toastProps.message} severity={toastProps.severity} open={toastProps.open} />
        </Navigation>
    )
}