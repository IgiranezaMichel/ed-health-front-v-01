/* eslint-disable @typescript-eslint/no-explicit-any */
import { BusinessCenter, CreateNewFolder, Description, LocalHospital, LocationOn, NewReleases } from "@mui/icons-material"
import { StudentMenu } from "../../../MenuBarItems/StudentMenu"
import { Navigation } from "../../../components/default/Navigation"
import { Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Zoom } from "@mui/material"
import { useFindJobsPostedPage } from "../../../controller/viewHooks/jobHooks"
import { useState } from "react"
import { PaginationInput } from "../../../typeDefs/PaginationInput"
import { JobStatus } from "../../../enums/JobStatus"
import { TimeIcon } from "@mui/x-date-pickers"
import { PIE_CHART_DEFAULT } from "../../../components/default/PIECHART"
import { DashboardCard } from "../../../components/default/DashboardCard"

export const JobPublished = () => {
    const [page, usePage] = useState<PaginationInput>({
        pageNumber: 0,
        pageSize: 10,
        sort: "id"
    });
    const jobs = useFindJobsPostedPage(page, JobStatus.ACTIVE);
    console.log(jobs)
    return (
        <Navigation items={StudentMenu}>
            <Card elevation={4} className="col-sm-6 float-end">
                <DashboardCard icon={<BusinessCenter className="float-md-end fs-1" />} subtitleDescription="Job successful analysis" />
                <div className="col-12 py-1">
                    <PIE_CHART_DEFAULT centerLabel="Job" items={[{ value: 1, label: 'Success' }]} />
                </div>
                <div className="modal-footer p-1">
                    <Button variant="contained" className="m-1">New Jobs</Button>
                    <Button variant="outlined" className="m-1">history</Button>
                </div>
            </Card>
            <div style={{ clear: 'both' }}>
                <NewReleases /> Jobs
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Published by</TableCell>
                        <TableCell>Deadline</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.finishLoading && jobs.jobObj.content.length != 0 && jobs.jobObj.content.map((job: any, index: any) => {
                        return <TableRow key={index}>
                            <TableCell>#</TableCell>
                            <TableCell>
                                <div>{job.title}</div>
                                <Tooltip TransitionComponent={Zoom} placement="top" title="Number of employee">
                                    <div> <b>N <sup className="border">o</sup> of Employee</b> {job.numberOfEmployee}</div>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <div className="m-1"><LocalHospital />{job.hospital.name}</div>
                                <div className="m-1"><LocationOn />{job.hospital.location.Location.Location.name}/{job.hospital.location.Location.name}/{job.hospital.location.name}</div>
                                <div>
                                    <TimeIcon /> {String(job.timeStamp).split('T')[0]}
                                </div>
                            </TableCell>
                            <TableCell>
                                <TimeIcon /> {job.deadline}
                            </TableCell>
                            <TableCell>
                                <Tooltip TransitionComponent={Zoom} className="m-1" placement="top" title={"Check detail of " + job.title + " Position"}>
                                    <span><Description /></span>
                                </Tooltip>
                                <Tooltip TransitionComponent={Zoom} className="m-1" placement="top" title={"Apply for " + job.title + " Position"}>
                                    <span><CreateNewFolder /></span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
            {jobs.finishLoading && jobs.jobObj.content.length == 0 && <div className="p-2 bg-primary text-center text-white fw-bolder">
                -- No New Job Posted found --
            </div>}
        </Navigation>
    )
}