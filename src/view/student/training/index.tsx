/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAppendingTraining } from "../../../controller/viewHooks/training/useAppendingTraining";
import { STATUS } from "../../../enums/Status";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { Navigation } from "../../../components/default/Navigation";
import { StudentMenu } from "../../../MenuBarItems/StudentMenu";
import { BusinessCenter, CreateNewFolder, Description, NewReleases } from "@mui/icons-material";
import {  Card, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Zoom } from "@mui/material";
import { TimeIcon } from "@mui/x-date-pickers";
import { DashboardCard } from "../../../components/default/DashboardCard";
import { PIE_CHART_DEFAULT } from "../../../components/default/PIECHART";

export const StudentTraining = () => {
    const [page, setPage] = useState<PaginationInput>({
        pageNumber: 0, pageSize: 10, sort: "id"
    })
    const { appendingTrainingDetail, isLoadingAppendingTrainingData } = useAppendingTraining(STATUS.APPENDING, page);
    console.log(appendingTrainingDetail)
    return (
        <Navigation items={StudentMenu}>
            <div>
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
                {!isLoadingAppendingTrainingData && <div>
                    
                    <span className="display-6 d-block" style={{clear:'both'}}><NewReleases className="fs-1" /> Training</span>
                    {appendingTrainingDetail.content.length != 0 &&
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
                                        appendingTrainingDetail.content.map((data: any, index: any) => {
                                            return <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{data.title}</TableCell>
                                                <TableCell>{data.hospital.name}</TableCell>
                                                <TableCell><TimeIcon />{data.deadline}</TableCell>
                                                <TableCell>
                                                    <Tooltip TransitionComponent={Zoom} className="m-1" placement="top" title={"Check detail of " + data.title}>
                                                        <span><Description /></span>
                                                    </Tooltip>
                                                    <Tooltip TransitionComponent={Zoom} className="m-1" placement="top" title={"Apply for " + data.title}>
                                                        <span><CreateNewFolder /></span>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>

                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    }
                    {appendingTrainingDetail.content.length == 0 &&
                        <div className="p-2 fw-bold text-center bg-primary text-white">
                            -- No New training found --
                        </div>
                    }
                </div>}
            </div>
        </Navigation>
    )
}