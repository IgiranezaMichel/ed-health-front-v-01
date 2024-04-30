import { Check, DoNotDisturb, HdrStrongOutlined, School, SchoolSharp } from "@mui/icons-material"
import { useState } from "react"
import { NcnmMenu } from "../../../MenuBarItems/NcnmMenu"
import { DashboardCard } from "../../../components/default/DashboardCard"
import { Navigation } from "../../../components/default/Navigation"
import { STATUS } from "../../../enums/Status"
import { AppendingTrainingList } from "./components/AppendingTrainingList"
import { ExpiredTrainingList } from "./components/ExpiredTrainingList"
import { Card } from "@mui/material"
export const NcnmTraining = () => {
    const [selected, setIsSelected] = useState(0);
    const [ncnmStatus, setNcnmStatus] = useState(STATUS.APPENDING);
    return (
        <Navigation items={NcnmMenu}>
            <div className="col-sm-4 float-md-end mb-3">
                <DashboardCard subtitleDescription="Total" title="Available Active training " icon={<School className="float-end fs-1" />} size={2} />
            </div>
            <Card className="col-sm-12 mb-4 p-2 rounded-0" elevation={3} style={{clear:'both'}}>
            <div className="display-5 mb-3" style={{ filter: ('drop-shadow(2px 2px 2px blue)') }}>Training</div>
                <button onClick={() => { setIsSelected(0); setNcnmStatus(STATUS.APPENDING) }} className={selected == 0 ? "bg-primary text-white fw-bold btn" : "bg-white btn"}><HdrStrongOutlined /> Appending</button>
                <button onClick={() => { setIsSelected(1); setNcnmStatus(STATUS.CANCEL) }} className={selected == 1 ? "bg-primary text-white fw-bold btn" : "bg-white btn"}><SchoolSharp />Cancelled Append</button>
                <button onClick={() => { setIsSelected(2); setNcnmStatus(STATUS.APPROVE) }} className={selected == 2 ? "bg-primary text-white fw-bold btn" : "bg-white btn"}><HdrStrongOutlined />Approved Training</button>
                <button onClick={() => { setIsSelected(3); setNcnmStatus(STATUS.CANCEL) }} className={selected == 3 ? "bg-danger text-white fw-bold btn" : "bg-white btn"}><DoNotDisturb />Cancelled</button>
                <button onClick={() => { setIsSelected(4); setNcnmStatus(STATUS.APPROVE) }} className={selected == 4 ? "bg-success text-white fw-bold btn" : "bg-white btn"}><Check />Success</button>
            </Card>
            {(selected==0||selected==1||selected==2)&&<AppendingTrainingList status={ncnmStatus}/>}
            {(selected==3||selected==4)&&<ExpiredTrainingList status={ncnmStatus}/>}
        </Navigation>
    )
}