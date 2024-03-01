/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useFindTrainingById } from "../../../../controller/viewHooks/training/useFindTrainingById";
import { Navigation } from "../../../../components/default/Navigation";
import { NcnmMenu } from "../../../../MenuBarItems/NcnmMenu";
import { Button, Card, CircularProgress } from "@mui/material";
import { DescriptionTwoTone, LocalHospitalOutlined } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import { useModifyTrainingApprovalStatus } from "../../../../controller/dmlHooks/Training/TrainingDao";
import { STATUS } from "../../../../enums/Status";

export const TrainingDetail = () => {
  const { trainingId } = useParams();
  const { applicantList, isFindingTraining, trainerList, trainingDetail, trainingRequirementList, refreshTrainingDetail } = useFindTrainingById(Number(trainingId));
  const [trainingStatus, setTrainingStatus] = useState('');
  const { isProcessingRegisterTrainingStatus, saveTrainingStatusHandler, saveTrainingStatusResult } = useModifyTrainingApprovalStatus(Number(trainingId), trainingStatus);
  const saveUpdatesHandler = () => {
    if (trainingStatus != '') {
      saveTrainingStatusHandler();
      if (!isProcessingRegisterTrainingStatus) {
        alert(saveTrainingStatusResult); refreshTrainingDetail()
      }
    }
    else {
      alert('Please select training status')
    }
  }
  return (
    <Navigation items={NcnmMenu}>
      {isFindingTraining && <div>
        <CircularProgress />
      </div>}
      {
        !isFindingTraining &&
        <section className="row m-auto g-3">
          <div className="col-sm-4 d-flex justify-content-center align-items-center">
            <Card className="border-o col-sm-12">
              <img src={trainingDetail.hospital.logo} className="card-img" />
              <div className="bg-light p-2">
                <div className="mb-2"><LocalHospitalOutlined /><b>{trainingDetail.hospital.name}</b></div>
                <div className="mb-2"><CalendarIcon />{String(trainingDetail.hospital.timeStamp).split('T')[0]}</div>
                <div className="mb-2"><DescriptionTwoTone />{trainingDetail.hospital.description}</div>
              </div>
            </Card>
          </div>
          <div className="col-sm-8 d-flex border justify-content-center align-items-center">
            <Card className="col-sm-12 border-0">
              <div className="bg-body px-2 mb-3">
                <div className="card-title">Training title:{trainingDetail.title}</div>
                <div className="card-title">{trainingDetail.description}</div>
                <div className="card-title">Deadline:{String(trainingDetail.deadline).split('T')[0]}</div>
              </div>
              <div className="bg-light p-2 border-3 border-top">
                <b>Trainer List</b>
                {trainerList.length == 0 && <div className="text-center p-2">
                  -- No trainer found --
                </div>
                }
              </div>
            </Card>
          </div>
          <div className="col-sm-12 m-auto dfl">
            <Card className="p-2">
              <div>
                <b>Status :</b>{trainingDetail.ncnmApprovalStatus}
              </div>
              <div className="modal-footer p-2">
                <select onChange={(e) => setTrainingStatus(e.target.value)} className="p-2">
                  <option value="">select training status</option>
                  <option value={STATUS.APPROVE}>Approve Training</option>
                  <option value={STATUS.CANCEL}>Cancel Training</option>
                </select>
                <Button className="mx-1 bg-primary text-white fw-bolder" onClick={() => saveUpdatesHandler()}>Approve</Button>
              </div>
            </Card>
          </div>
          <Card className="accordion accordion-flush bg-white border col-sm-12" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                  Requirements || Total Applicant <span className="badge bg-primary">{applicantList.length}</span>
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {trainingRequirementList.map((data: any) => {
                    return <ul>
                      <li>{data.description}</li>
                    </ul>
                  })}
                </div>
              </div>
            </div>

          </Card>

        </section>
      }
    </Navigation>
  )
}
