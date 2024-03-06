/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom"
import { useFindTrainingById } from "../../../controller/viewHooks/training/useFindTrainingById";
import { Button, Card, Divider } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import { Navigation } from "../../../components/default/Navigation";
import { HospitalMenu } from "../../../MenuBarItems/HospitalMenu";
import { useState } from "react";

export const TrainingCertificate = () => {
    const { trainingId } = useParams();
    const { trainingDetail, isFindingTraining } = useFindTrainingById(Number(trainingId));
    const [show,setShow]=useState('');
    return (
        <Navigation items={HospitalMenu}>
            {!isFindingTraining && <Card elevation={3} className="border">
                <Card elevation={5} className="border bg-primary border-secondary text-white p-2">
                    <div className="display-6 fw-bolder mb-2">{trainingDetail.title}</div>
                    <div className="fw-bolder mb-2"><LocationOn /> {trainingDetail.location.Location.Location.name}/{trainingDetail.location.Location.name} || {trainingDetail.location.name}</div>
                    <Divider className="border border-3 border-white my-3" />
                    {trainingDetail.description}
                </Card>
                <div className="d-flex justify-content-center p-2">
                    <div className="mx-2">
                        Total Attended Student <span
                            className="badge bg-primary">10</span>
                    </div>
                    <div className="mx-2">
                        Given certificate Student <span
                            className="badge bg-primary">10</span>
                    </div>
                </div>
                <div className="modal-footer m-2">
                    {show==''?<Button onClick={()=>setShow('createCertificate')} className="fw-bold" variant="contained">New Certificate</Button>
                    :show=='createCertificate'?<Button onClick={()=>setShow('')} className="fw-bold bg-danger" variant="contained">Cancel</Button>
                    :''
                    }
                </div>
                
            </Card>
            }
        </Navigation>
    )
}