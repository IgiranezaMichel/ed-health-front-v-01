import { ListAltRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { HospitalMenu } from "../../../../MenuBarItems/HospitalMenu";
import { DashboardCard } from "../../../../components/default/DashboardCard";
import { Navigation } from "../../../../components/default/Navigation";
import { ShowApplicantStatus } from "./TrainingApplicantByStatus";
import { useState } from "react";
import { STATUS } from "../../../../enums/Status";

export const TrainingApplicationDetail = () => {
  const { trainingId } = useParams();
  const [applicantStatus, setApplicantStatus] = useState(STATUS.APPENDING);
  return (
    <Navigation items={HospitalMenu}>
      <div className="row col-sm-12 mb-4">
        <div className="col-sm-4">
          <DashboardCard title="Student Status Application" />
        </div>
        <div className="col-sm-4">
          <DashboardCard title="Admin Approval status" />
        </div>
      </div>
      <div className="mb-2">
        <Button style={{ clipPath: ' polygon(75% 0%, 90% 50%, 75% 100%, 0% 100%, 5% 50%, 0% 0%)' }}
          onClick={() => setApplicantStatus(STATUS.APPENDING)}
          variant={applicantStatus == STATUS.APPENDING ? "contained" : "outlined"}
          className={applicantStatus == STATUS.APPENDING ?"p-4 fw-bolder":"p-4 text-white fw-bolder bg-dark"}
          >
          <ListAltRounded /> Appending
        </Button>
        <Button style={{ clipPath: ' polygon(75% 0%, 86% 50%, 75% 100%, 0% 100%, 14% 50%, 0% 0%)',marginLeft:'-30px'}}
          onClick={() => setApplicantStatus(STATUS.APPROVE)}
          variant={applicantStatus == STATUS.APPROVE ? "contained" : "outlined"} 
          className={applicantStatus == STATUS.APPROVE ?"p-4 fw-bolder":"p-4 text-white fw-bolder bg-dark"}
          >
          <ListAltRounded /> Approved
        </Button>
        <Button style={{ clipPath: ' polygon(75% 0%, 90% 50%, 75% 100%, 0% 100%, 14% 50%, 0% 0%)',marginLeft:'-30px'}}
          onClick={() => setApplicantStatus(STATUS.CANCEL)}
          variant={applicantStatus == STATUS.CANCEL ? "contained" : "outlined"} 
          className={applicantStatus == STATUS.CANCEL ?"p-4 fw-bolder":"p-4 text-white fw-bolder bg-dark"}
          >
          <ListAltRounded /> Cancel
        </Button>
        <Button style={{ clipPath: ' polygon(75% 0%, 90% 50%, 75% 100%, 0% 100%, 14% 50%, 0% 0%)',marginLeft:'-30px'}}
          onClick={() => setApplicantStatus(STATUS.CERTIFIED)}
          variant={applicantStatus == STATUS.CERTIFIED ? "contained" : "outlined"} 
          className={applicantStatus == STATUS.CERTIFIED ?"p-4 fw-bolder":"p-4 text-white fw-bolder bg-dark"}
          >
          <ListAltRounded /> Certified
        </Button>
      </div>
      <ShowApplicantStatus trainingId={Number(trainingId)} status={applicantStatus} />
    </Navigation>
  )
}
