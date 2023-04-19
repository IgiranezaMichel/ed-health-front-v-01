/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarMonthOutlined, ListAltOutlined, Person2, Phone } from "@mui/icons-material";
import { Card, CircularProgress } from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers";
import useFindCertificateById from "../../../../controller/viewHooks/useFindCertificateById";
import { PIE_CHART_DEFAULT } from "../../../../components/default/PIECHART";

export const CertificateDetail = (props: { certificateId: number }) => {
    const { certificateDetail, isLoadingCertificate } = useFindCertificateById(props.certificateId);
    console.log(certificateDetail)
    console.log(isLoadingCertificate);
    return (
        <>
            {isLoadingCertificate && <div className="d-flex justify-content-center align-items-center">
                <CircularProgress />
            </div>}
            {!isLoadingCertificate && <Card elevation={5} className="col-12 m-auto row">
                <Card className="mt-4 p-0 col-md-7 rounded-0">
                    <PIE_CHART_DEFAULT items={[{label:'',value:10}]} centerLabel="Certified status"/>
                </Card>
                <Card className="mt-4 col-md-5 rounded-0">
                    <img width={50} height={50} className="rounded-circle" src={certificateDetail.training.hospital.logo} alt={certificateDetail.training.hospital.name} />
                    <div className="mb-1"><b style={{fontFamily:'monospace'}}>Hospital </b>{certificateDetail.training.hospital.name}</div>
                    <div>{certificateDetail.training.description}</div>
                    <div className="mb-1"><b>Training Title</b>{certificateDetail.training.title}</div>
                    <div className="mb-1"><b>Total Participant </b><span
                        className="badge bg-primary">New!</span>
                    </div>
                    <div className=""><b>Training Location </b>
                    {certificateDetail.training.location.Location.Location.name}/{certificateDetail.training.location.Location.name}/
                    {certificateDetail.training.location.name}
                    </div>
                    <div>{certificateDetail.training.description}</div>
                    <div><CalendarMonthOutlined />{String(certificateDetail.training.deadline).split('T')[0]}</div>
                    <span className="float-end">Published at {String(certificateDetail.training.timeStamp).split('T')[0]}</span>
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
                </Card>
                <Card className="col-sm-6 mt-2" elevation={9}>
                    <span className="fw-bolder p-2">Trainer</span>
                    <div className="row col-12 m-auto g-2">
                        {certificateDetail.training.trainers.map((data:any,index:any)=>{
                            return  <div key={index} className="col-sm-6 mt-3">
                                <Card >
                                <img className="card-img" src={data.profilePicture} alt="" />
                               <div><Person2/><b>{data.trainerTitle}</b> <span>{data.name}</span></div> 
                               <div><Phone/> {data.phoneNumber}</div> 
                               </Card>
                            </div>
                          
                        })}
                    </div>
                </Card>
            </Card>}
        </>
    )
}
