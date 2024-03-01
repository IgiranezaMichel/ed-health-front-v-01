import { ListAltRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { HospitalMenu } from "../../../../MenuBarItems/HospitalMenu";
import { DashboardCard } from "../../../../components/default/DashboardCard";
import { Navigation } from "../../../../components/default/Navigation";
import {ShowApplicantStatus } from "./TrainingApplicantByStatus";
import { useState } from "react";
import { STATUS } from "../../../../enums/Status";

export const TrainingApplicationDetail = () => {
  const { trainingId } = useParams();
  const [applicantStatus,setApplicantStatus]=useState(STATUS.APPENDING);
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
      <div className="">
        <Button onClick={()=>setApplicantStatus(STATUS.APPENDING)} variant={applicantStatus==STATUS.APPENDING?"contained":"outlined"} className="m-2 fw-bolder">
          <ListAltRounded /> Appending
        </Button>
        <Button onClick={()=>setApplicantStatus(STATUS.APPROVE)} variant={applicantStatus==STATUS.APPROVE?"contained":"outlined"} className="m-2 fw-bolder">
          <ListAltRounded /> Approved
        </Button>
        <Button onClick={()=>setApplicantStatus(STATUS.CANCEL)} variant={applicantStatus==STATUS.CANCEL?"contained":"outlined"} className="m-2 fw-bolder">
          <ListAltRounded /> Cancelled
        </Button>
      </div>
      <ShowApplicantStatus trainingId={Number(trainingId)} status={applicantStatus} />
    </Navigation>
  )
}
