/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarMonthOutlined, ListAltOutlined, Person2, Phone, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Card, CircularProgress } from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers";
import useFindCertificateById from "../../../../controller/viewHooks/useFindCertificateById";
import { PIE_CHART_DEFAULT } from "../../../../components/default/PIECHART";
import { useState } from "react";

export const CertificateDetail = (props: { certificateId: number }) => {
    const { certificateDetail, isLoadingCertificate } = useFindCertificateById(props.certificateId);
    const [showTrainer,setShowTrainer]=useState(false);
    console.log(certificateDetail)
    console.log(isLoadingCertificate);
    return (
        <>
            {isLoadingCertificate && <div className="d-flex justify-content-center align-items-center">
                <CircularProgress />
            </div>}
            {!isLoadingCertificate && <Card elevation={5} className="col-12 m-auto row">
                <Card className="mt-4 p-0 col-md-6 rounded-0">
                    <PIE_CHART_DEFAULT items={[{label:'',value:10}]} centerLabel="Certified status"/>
                </Card>
                <Card className="mt-4 col-md-6 rounded-0 d-flex align-items-center">
                   <section className="">
                   <div className="mb-1"><b style={{fontFamily:'sans-serif'}}> Hospital </b>{certificateDetail.training.hospital.name}</div>
                    <div>{certificateDetail.training.description}</div>
                    <div className="mb-1"><b style={{fontFamily:'sans-serif'}}> Training Title</b>{certificateDetail.training.title}</div>
                    <div className="mb-1"><b style={{fontFamily:'sans-serif'}}>Total Participant </b><span
                        className="badge bg-primary">New!</span>
                    </div>
                    <div className=""><b style={{fontFamily:'sans-serif'}}>Training Location </b>
                    {certificateDetail.training.location.Location.Location.name}/{certificateDetail.training.location.Location.name}/
                    {certificateDetail.training.location.name}
                    </div>
                    <div>{certificateDetail.training.description}</div>
                    <div><CalendarMonthOutlined />{String(certificateDetail.training.deadline).split('T')[0]}</div>
                    <span className="float-end">Published at {String(certificateDetail.training.timeStamp).split('T')[0]}</span>
                   </section>
                </Card>
                <Card className="col-sm-12 mt-2 p-2" elevation={9}>
                    <span className="fw-bolder p-2 display-4">Trainer</span>
                    <Button onClick={()=>setShowTrainer(!showTrainer)} className="float-end">{showTrainer?<Visibility/>:<VisibilityOff/>}</Button>
                   {showTrainer&&<section className="d-flex justify-content-center align-content-center">
                   <div className="row container-lg m-auto g-2">
                        {certificateDetail.training.trainers.map((data:any,index:any)=>{
                            return  <div key={index} className="col-sm-2 mt-3">
                                <Card className="p-1 rounded-0" elevation={4}>
                                <div className="text-center p-2">
                                <img height={100} src={data.profilePicture} alt="" />
                                </div>
                               <div><Person2/><b>{data.trainerTitle}</b> <span>{data.name}</span></div> 
                               <div><Phone/> {data.phoneNumber}</div> 
                               </Card>
                            </div>
                          
                        })}
                    </div>
                   </section>}
                </Card>
                <Card className="col-sm-6 mt-2 rounded-0" elevation={9}>
                    <div className="fw-bold p-3 fs-4">Certificate</div>
                    <span className=""><b>Title </b>{certificateDetail.title}</span>
                    <div>
                       <b>Description</b> {certificateDetail.description}
                    </div>
                    <div><span>Prepared By </span><b>{certificateDetail.training.hospital.name}</b></div>
                   <div> <span className="float-end mb-2" style={{clear:'both'}}><CalendarIcon/> <b>{String(certificateDetail.timeStamp).split('T')[0]}</b></span></div>
                   <div className="mt-4 ">
                    <ListAltOutlined/>
                   </div>
                Certificate
                </Card>
                
            </Card>}
        </>
    )
}
