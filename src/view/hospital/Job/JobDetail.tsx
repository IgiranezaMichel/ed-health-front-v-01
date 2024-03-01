/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client";
import { AccountBoxRounded, Cancel, Check, CheckCircle, Close, LibraryAdd, ListAlt, School, Sort } from "@mui/icons-material";
import { Box, Button, Card, Pagination, Skeleton } from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HospitalMenu } from "../../../MenuBarItems/HospitalMenu";
import { Navigation } from "../../../components/default/Navigation";
import { Toast } from "../../../components/default/Toast";
import { useFindJobById } from "../../../controller/viewHooks/jobHooks";
import { SAVE_JOB_REQUIREMENT } from "../../../graphQl/mutation/JobRequirementMutation";
import { JobRequirementInput } from "../../../typeDefs/JobRequirementInput";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { ToastProps } from "../../../typeDefs/ToastProps";

export const JobDetail=()=>{
   const {id}= useParams();
   const [page, setPage] = useState<PaginationInput>({
    pageNumber: 0,
    pageSize: 8,
    sort: "deadline"
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event;
    setPage({ ...page, pageNumber: value - 1 });
  };
const {jobDetail,jobDetailIsLoading}=useFindJobById(Number(id));
const [add,setAdd]=useState(false);
const [requirement,setRequirement]=useState<JobRequirementInput>({
    id:0,
    description:'',
    jobId:Number(id)
});
const [saveJobRequirement]=useMutation(SAVE_JOB_REQUIREMENT);
console.log(jobDetail);
const [toastProps,setToastProps]=useState<ToastProps>({
    message:'',
    open:false,
    severity:'info'
})
const SaveJobRequirement=()=>{
  saveJobRequirement({variables:{input:requirement}}).then(data=>{
    setToastProps({message:data.data.saveJobRequirement,open:true,severity:'success'})
  }) 
  useEffect(
    ()=>{
       const fetchData=async()=>{
            console.log(jobDetailIsLoading)
            console.log(jobDetail)
        }
        fetchData();
    }
  ),[jobDetailIsLoading,jobDetail] 
}
return(
    <Navigation items={HospitalMenu}>
        <div className="d-flex justify-content-center align-content-center">
            {jobDetailIsLoading&&<span>
                <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
            </span>

            }
        </div>
      {!jobDetailIsLoading&&<Card elevation={4} className="row m-auto col-sm-10">
         
                <Card elevation={4} className="col-sm-6 p-0 rounded-0">
                    <img className="card-img-top"  src={jobDetail.picture} alt=""/>
                   <div className="px-3">
                   <h4 className="card-title mb-4">{jobDetail.title}</h4>
                        <div className="card-text mb-2"><b>DeadLine </b>{String(jobDetail.deadline).split('T')[0]}</div>
                        <div className="card-text"><b>Status</b> {jobDetail.status} <span
                            className="badge bg-success"> </span>
                        </div>
                        <span className="float-end"><CalendarIcon/>{String(jobDetail.timeStamp).split('T')[0]}</span>
                   </div>
                </Card>
                <div className="card col-sm-6">
                    <img className="card-img-top" src="holder.js/100x180/" alt=""/>
                    <div className="card-body">
                        <h4 className="card-title fw-bold">Job Requirement</h4>
                        {
                            jobDetail.jobRequirement.map((data:any)=>{
                                return <ul>
                                    <li>{data.description}</li>
                                </ul>
                            })
                        }
                        {add&&<div>
                            <input type="text" value={requirement.description} onChange={(e)=>setRequirement({...requirement,description:e.target.value})} className="w-75" />
                        <Check onClick={()=>SaveJobRequirement()} className="p-1 text-white rounded-circle mx-3 bg-success"/>
                        <Close className="p-1 text-white rounded-circle bg-danger" onClick={()=>setAdd(false)} /></div>}
                        <LibraryAdd onClick={()=>setAdd(true)} className="float-end" style={{clear:'both'}}/>
                    </div>
                </div>
                <Card className="card text-white bg-primary">
                  <div className="card-body">
                    <h4 className="card-title">Applicant</h4>
                    <Button className="btn text-light border fw-bold rounded-0 bg-info">Applicant</Button>
                    <Button className="btn text-black border fw-bold rounded-0 bg-white">Approve Applicant</Button>
                    <Button className="btn text-black border fw-bold rounded-0 bg-white">Rejected Applicant</Button>
                  </div>
                  <div>  Page {0 + 1} out of {0}  <span>
              <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2">
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="32">32</option>
              </select>
            </span>
              <span className="float-end"> Sort by<select onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
                <option selected={page.sort == 'title' ? true : false} value={"title"}>Title</option>
                <option selected={page.sort == 'description' ? true : false} value="description">Description</option>
                <option selected={page.sort == 'deadline' ? true : false} value="deadline">Deadline</option>
                <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
                <option selected={page.sort == 'location' ? true : false} value="numberOfEmployee">Number of employee</option>
              </select><Sort /></span>
              <Pagination
                count={5}
                page={5 + 1}
                onChange={handleChange}
              />
            </div>
                </Card>
            <div className="row col-11 m-auto g-2 mb-4">
                <div className="col-sm-4">
                            <Card className="p-0 rounded-0" elevation={4}>
                                <img className="card-img" style={{height:'150px',objectFit:'cover'}} src="/visitor/login-img.jpg" alt="" />
                                <section className="card-body mx-1">
                                    <div className="mb-1"><AccountBoxRounded/>User Detail</div>
                                    <div className="mb-1"><AccountBoxRounded/>Experience</div>
                                    <div className="mb-1"><School/>School name</div>
                                    <div className="modal-footer">
                                        <Cancel className="text-danger mx-1 mb-2"/>
                                        <CheckCircle className="text-success mx-1 mb-2"/>
                                        <ListAlt className="mx-1 mb-2"/>
                                    </div>
                                </section>
                            </Card>
                </div>
            </div>  
     <Toast message={toastProps.message} severity={toastProps.severity} open={toastProps.open}/>
      </Card>}
    </Navigation>
)
}