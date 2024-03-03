/* eslint-disable @typescript-eslint/no-explicit-any */
import { BusinessCenter, CreateNewFolder, Description, LocalHospital, LocationOn, NewReleases, People } from "@mui/icons-material"
import { StudentMenu } from "../../../MenuBarItems/StudentMenu"
import { Navigation } from "../../../components/default/Navigation"
import { Button, Card, Divider, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Zoom } from "@mui/material"
import { useFindJobsPostedPage } from "../../../controller/viewHooks/jobHooks"
import { useState } from "react"
import { PaginationInput } from "../../../typeDefs/PaginationInput"
import { JobStatus } from "../../../enums/JobStatus"
import { TimeIcon } from "@mui/x-date-pickers"
import { PIE_CHART_DEFAULT } from "../../../components/default/PIECHART"
import { DashboardCard } from "../../../components/default/DashboardCard"
import { StudentJobApplicationDetail } from "./components/StudentJobApplicationDetail"
import { ApplicationDetail } from "./components/ApplicationDetail"
export const JobPublished = () => {
    const [page, usePage] = useState<PaginationInput>({
        pageNumber: 0,
        pageSize: 10,
        sort: "id"
    });
    const [jobId, setJobId] = useState(0);
    const [show, setShow] = useState('newJobs');
    const jobs = useFindJobsPostedPage(page, JobStatus.ACTIVE);
    console.log(jobs)
    return (
        <Navigation items={StudentMenu}>
       { jobId == 0 &&<>
        <Card elevation={4} className="col-sm-6 float-end">
                <DashboardCard icon={<BusinessCenter className="float-md-end fs-1" />} subtitleDescription="Job successful analysis" />
                <div className="col-12 py-1">
                    <PIE_CHART_DEFAULT centerLabel="Job" items={[{ value: 1, label: 'Success' }]} />
                </div>
                <div className="modal-footer p-1">
                    <Button onClick={() => setShow('newJobs')} variant={show == 'newJobs' ? "contained" : "outlined"} className="m-1">New Jobs</Button>
                    <Button onClick={() => setShow('history')} variant={show == 'history' ? "contained" : "outlined"} className="m-1">history</Button>
                </div>
            </Card>
            <div className="fw-bold py-2" style={{ clear: 'both' }}>
                <NewReleases />Recent posted Jobs
            </div>
            <section>
                {jobs.finishLoading && jobs.jobObj.content.length != 0 && show == 'newJobs' && jobs.jobObj.content.map((job: any, index: any) => {
                    return <Card key={index} className="p-2 border">
                        <div className="fs-4">{job.title}</div>
                        <div>
                            <LocationOn /> {job.hospital.location.Location.Location.name}/{job.hospital.location.Location.name}/{job.hospital.location.name}
                        </div>
                        <div><People /> <b>N <sup className="border">o</sup> of Employee</b> {job.numberOfEmployee}</div>
                        <div style={{ clear: 'both' }}>
                            <div ><span><TimeIcon />On {String(job.timeStamp).split('T')[0]}</span></div>
                            <div className="text-md-end" ><LocalHospital /> <b>Posted by </b> {job.hospital.name}</div></div>

                        <Divider className="m-2 m-2 border border-1 border-dark" />
                        <div>
                            {job.description}
                            <div className="text-md-end">
                                Deadline <TimeIcon /> {job.deadline}
                            </div>
                            <div className="modal-footer">
                                <Button onClick={() => setJobId(Number(job.id))} className="bg-primary text-white fw-bold">Apply</Button>
                            </div>
                        </div>
                    </Card>
                })}
                {jobs.finishLoading && jobs.jobObj.content.length == 0 && <div className="p-2 bg-primary text-center text-white fw-bolder">
                    -- No New Job Posted found --
                </div>}
            </section>
            {
                show == 'history' && <StudentJobApplicationDetail />
            }
        </>}
        {jobId!=0&&<ApplicationDetail id={jobId}/>}
        </Navigation>
    )
}