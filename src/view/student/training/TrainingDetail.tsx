/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from "@mui/material";
import { useFindTrainingById } from "../../../controller/viewHooks/training/useFindTrainingById"
import { Description, KeyboardArrowDown, LocalHospital, LocationOn } from "@mui/icons-material";
import { ClockIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import { Modal } from "../../../components/default/Modal";
import { useRegisterStudentTrainingApplication } from "../../../controller/dmlHooks/TrainingApplication/TrainingApplicationDao";
import { STATUS } from "../../../enums/Status";

export const TrainingDetail = (props: { trainingId: number }) => {
    const [showDetail,setShowDetail]=useState(false);
    const studentData=JSON.parse(String(localStorage.getItem("Student")));
    const studentDataHandler=useRegisterStudentTrainingApplication(studentData.id,props.trainingId,STATUS.APPENDING);
    const saveStudentTrainingRegistration=()=>{
        studentDataHandler.saveStudentRegistrationHandler();
        if(studentDataHandler.hasFinishLoading){
            refreshTrainingDetail();
        }
    }
    const { refreshTrainingDetail,isFindingTraining, trainingDetail } = useFindTrainingById(Number(props.trainingId));
    const applicationModal=<Modal id="apply" title="Apply for training" 
    actionBtn={<Button onClick={()=>saveStudentTrainingRegistration()} className="bg-primary text-white fw-bold"> Yes</Button>}>
       <div className="py-3 m-2">
       Are you sure you want to apply this training?
       </div>
    </Modal>
    return (
        <div>
            {!isFindingTraining && <>
                <Card className="col-sm-3 border-4 border-top border-primary">
                    <div className="text-center">
                        <span className="bg-primary text-white p-3">Host</span>
                    </div>
                    <img src={trainingDetail.hospital.logo} className="card-img" />
                    <section>
                        <div className="m-1"><LocalHospital />{trainingDetail.hospital.name}</div>
                        <div className="m-1"><LocationOn />{trainingDetail.location.Location.Location.name} || {trainingDetail.location.Location.name} || {trainingDetail.location.name}</div>
                    </section>
                </Card>
                <Card className="mt-3 p-2">
                    <Card elevation={5} className="p-2">
                        <h2 className="card-title mb-2">{trainingDetail.title}</h2>
                        <div className="mb-1"><span><LocationOn />{trainingDetail.location.Location.Location.name} || {trainingDetail.location.Location.name} || {trainingDetail.location.name}</span></div>
                        <div className="card-body mb-2">
                            <Description /> {trainingDetail.description}
                            <span className="float-end" style={{clear:'both'}} ><ClockIcon /> {trainingDetail.deadline}</span>
                            <div className="text-center fw-bold">
                            <KeyboardArrowDown onClick={()=>setShowDetail(!showDetail)}/>
                            </div>
                        </div>
                    </Card>
                    <div className="card-body p-2">
                        {showDetail&&trainingDetail.trainingRequirementList.length== 0&&<div className="p-3 bg-primary text-center fw-bold text-white">
                            --- no data found ---
                        </div>}
                        {trainingDetail.trainingRequirementList.length!= 0 &&
                           <>
                           <small className="p-2">Total applicant <span className="badge bg-info fw-bolder">{trainingDetail.applicantList.length}</span></small>
                           <small className="p-2">Total Trainer <span className="badge bg-info fw-bolder">{trainingDetail.trainers.length}</span></small>
                           {showDetail&&<>
                                <h4 className="mt-3 my-3">Requirement</h4>
                                {
                                    trainingDetail.trainingRequirementList.map((data: any,index:any) => {
                                        return <ul key={index}>
                                            <li>{data.description}</li>
                                        </ul>
                                    })
                                }
                            </>}
                           </>
                        }
                        <Button className="float-end fw-bold text-white" data-bs-toggle="modal"
                            data-bs-target="#apply" variant="contained">Apply</Button>
                    </div>
                </Card>
            </>}
            {applicationModal}
        </div>
    )
}
