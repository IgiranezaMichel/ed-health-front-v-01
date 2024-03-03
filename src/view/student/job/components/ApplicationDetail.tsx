/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Divider } from "@mui/material";
import { useFindJobById } from "../../../../controller/viewHooks/jobHooks";
import { LocationOn } from "@mui/icons-material";
export const ApplicationDetail=(props:{id:number})=>{
const job=useFindJobById(Number(props.id));
console.log(job.jobDetail)
return(
    <>
    {!job.jobDetailIsLoading&&
    <Card elevation={4} className="p-3">
        <div className="fs-4 fw-bold">
            {job.jobDetail.title}
        </div>
        <div>
        <LocationOn/>{job.jobDetail.hospital.location.Location.Location.name} || {job.jobDetail.hospital.location.Location.name} || {job.jobDetail.hospital.location.name}
        </div>
        <div>
          Posted by  {job.jobDetail.hospital.name}
        </div>
        <div className="text-md-end"><span >Deadline {job.jobDetail.deadline}</span></div>
        <Divider className="border border-2 m-3 border-primary-subtle"/>
        <div>
            {job.jobDetail.description}
        </div>
       {
        job.jobDetail.jobRequirement.length==0?<div>-- no data found</div>:
        <div>
            <div className="fs-5 fw-bold py-2">Requirement</div>
            {
            job.jobDetail.jobRequirement.map((data:any,index:any)=>{
                return <li key={index}>{data.description}</li>
              
            })
            }</div>
       }
       <div className="modal-footer">
        <Button variant="contained">Apply</Button>
       </div>
    </Card>}

    </>
)
}