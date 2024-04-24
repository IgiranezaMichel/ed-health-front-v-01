/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CircularProgress } from "@mui/material";
import { useGetStudentJobApplicationHistoryList } from "../../../controller/viewHooks/JobApplication/JobApplicationDao"

export const UserJobDetail=(props:{userId:number})=>{
    const {isLoading,jobApplicationData}=useGetStudentJobApplicationHistoryList(props.userId);
    console.log(jobApplicationData);
    return(
        <>
        {isLoading&&<section className="text-center"><CircularProgress/></section>}
        {!isLoading&&jobApplicationData!=undefined&&jobApplicationData.length!=0&&<>    
        <Card elevation={3} className="mt-3 row rounded-0 p-2">
        <div className="col-5 fw-bold">Job Title</div>
        <div className="col-2 fw-bold">Job Status</div>
        <div className="col-2 fw-bold">Status</div>
        <div className="col-3 fw-bold">Applied on</div>
        </Card>
        {jobApplicationData.map((data:any,index:number)=>{
            return(<Card key={index} elevation={3} className="mt-2 bg-body-tertiary row rounded-0 p-2">
            <div className="col-5">{data.job.title}</div>
            <div className="col-2">{data.job.status}</div>
            <div className="col-2">{data.status}</div>
            <div className="col-3">{data.timeStamp}</div>
            </Card>)
        })}
        </>}
        {!isLoading&&jobApplicationData!=undefined&&jobApplicationData.length==0&&<div className="text-center fw-bold">
            -- No data found --
            </div>}
        </>
    )
}