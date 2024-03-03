/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CircularProgress, Divider } from "@mui/material"
import { useState } from "react"
import { PaginationInput } from "../../../../typeDefs/PaginationInput"
import { useGetStudentJobApplicationList } from "../../../../controller/viewHooks/JobApplication/JobApplicationDao"
import { STATUS } from "../../../../enums/Status"
import { LocationOn } from "@mui/icons-material"

export const StudentJobApplicationDetail=()=>{
 const [page,setPage]=useState<PaginationInput>({pageNumber:0,pageSize:10,sort:"id"})
 const student=JSON.parse(String(localStorage.getItem("Student")));
 const studentJobApplication=useGetStudentJobApplicationList(student.id,STATUS.APPENDING,page);
 console.log(studentJobApplication)
  return (
    <div>
        {studentJobApplication.isLoading&&<div><CircularProgress/></div>}
      {!studentJobApplication.isLoading&&
      studentJobApplication.jobApplicationObj.content.map((data:any,index:any)=>{
    return <Card key={index} elevation={4} className="mb-3 border border-1">
        <div className="display-6">{data.job.title}</div>
        <div className="mb-2"><LocationOn/>{data.job.hospital.location.Location.Location.name}/{data.job.hospital.location.Location.name}{data.job.hospital.location.name}</div>
        <div className="mb-2">
            <span className="float-md-end">Posted by {data.job.hospital.name}</span>
        </div>
        <Divider className="border border-2"/>
        <div className="">{data.job.description}</div>
        <div className=""><b>Deadline </b>{data.job.deadline}</div>
        <div className=""><b>Posted on </b>{data.timeStamp}</div>
      </Card>})}
      {
        !studentJobApplication.isLoading&&studentJobApplication.jobApplicationObj.content.length==0&&<div className="fw-bold text-white text-center bg-primary p-3">-- No data found -- </div>
      }
    </div>
  )
}
