/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { STATUS } from "../../../enums/Status";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { Navigation } from "../../../components/default/Navigation";
import { StudentMenu } from "../../../MenuBarItems/StudentMenu";
import { BusinessCenter, CreateNewFolder, Description, NewReleases } from "@mui/icons-material";
import {  Card, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Zoom } from "@mui/material";
import { TimeIcon } from "@mui/x-date-pickers";
import { DashboardCard } from "../../../components/default/DashboardCard";
import { PIE_CHART_DEFAULT } from "../../../components/default/PIECHART";
import { TrainingDetail } from "./TrainingDetail";
import { useNcnmTrainingApprovalStatusPage} from "../../../controller/viewHooks/training/useNcnmTrainingApprovalStatus";

export const StudentTraining = () => {
    const [page, setPage] = useState<PaginationInput>({
        pageNumber: 0, pageSize: 10, sort: "id"
    })
    const training = useNcnmTrainingApprovalStatusPage(page,STATUS.APPENDING);
    const [trainingId,setTrainingId]=useState(0);
    return (
        <Navigation items={StudentMenu}>
            {trainingId==0&&<div>
            <div className="row m-auto container-xxl g-1">
            <div className="col-sm-6">
            <Card elevation={4} >
                <DashboardCard icon={<BusinessCenter className="float-md-end fs-1" />} subtitleDescription="Job successful analysis" />
                <div className="col-12 py-1">
                <PIE_CHART_DEFAULT centerLabel="Job" items={[{value:1,label:'Success'}]}/>
                </div>
            </Card>
            </div>
            <div className="col-sm-6">
            <Card elevation={4} >
                <DashboardCard icon={<BusinessCenter className="float-md-end fs-1" />} subtitleDescription="Job successful analysis" />
                <div className="col-12 py-1">
                <PIE_CHART_DEFAULT centerLabel="Job" items={[{value:1,label:'Success'}]}/>
                </div>
            </Card>
            </div>
            </div>
                {training.hasFinishLoading && <div>
                    
                    <span className="display-6 d-block" style={{clear:'both'}}><NewReleases className="fs-1" /> Training</span>
                    {training.trainingObj.content.length != 0 &&
                        <div>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Assigned by</TableCell>
                                        <TableCell>Deadline</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        training.trainingObj.content.map((data: any, index: any) => {
                                            return <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{data.title}</TableCell>
                                                <TableCell>{data.hospital.name}</TableCell>
                                                <TableCell><TimeIcon />{data.deadline}</TableCell>
                                                <TableCell>
                                                    <Tooltip TransitionComponent={Zoom} className="m-1" placement="top" title={"Check detail of " + data.title}>
                                                        <span><Description onClick={()=>setTrainingId(Number(data.id))}/></span>
                                                    </Tooltip>
                                                    <Tooltip TransitionComponent={Zoom} className="m-1" placement="top" title={"Apply for " + data.title}>
                                                        <span><CreateNewFolder onClick={()=>setTrainingId(Number(data.id))}/></span>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    }
                    {training.trainingObj.content.length == 0 &&
                        <div className="p-2 fw-bold text-center bg-primary text-white">
                            -- No New training found --
                        </div>
                    }
                </div>}
            </div>}
            {trainingId!=0&&<div>
                <TrainingDetail trainingId={trainingId}/>
            </div>}
        </Navigation>
    )
}