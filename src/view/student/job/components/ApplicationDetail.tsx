/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Divider } from "@mui/material";
import { useFindJobById } from "../../../../controller/viewHooks/jobHooks";
import { LocationOn } from "@mui/icons-material";
import { Modal } from "../../../../components/default/Modal";
import { useRegisterStudentJobApplication } from "../../../../controller/dmlHooks/JobApplication/JobApplicationController";
import { STATUS } from "../../../../enums/Status";
export const ApplicationDetail=(props:{id:number})=>{
const job=useFindJobById(Number(props.id));
const student=JSON.parse(String(localStorage.getItem('Student')));
const{result,saveJobApplicationHandler}=useRegisterStudentJobApplication(Number(student.id),job.jobDetail.id,STATUS.APPENDING);
const saveJobApplication=()=>{
    saveJobApplicationHandler().then(()=>alert(result));
}
console.log(job.jobDetail)
const saveApplicationModal=<Modal id="saveApplication" title="Job Application" actionBtn={<button className="p-2 fw-bold text-white bg-primary border-0" onClick={()=>saveJobApplication()}>Yes</button>}>
<div className="p-3">Are you sure you want to apply for this job</div>
    </Modal>
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
        <Button variant="contained"  data-bs-toggle="modal"
            data-bs-target="#saveApplication">Apply</Button>
       </div>
    </Card>}
{saveApplicationModal}
    </>
)
}