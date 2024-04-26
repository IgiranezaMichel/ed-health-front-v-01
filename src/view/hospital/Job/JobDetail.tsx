/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccountBoxRounded, Cancel, CheckCircle,Description, FolderSpecial, KeyboardArrowDown, KeyboardArrowUp,ListAlt, Phone, School, Sort, Wc } from "@mui/icons-material";
import {  Button, Card, Divider, Pagination, Tooltip, Zoom } from "@mui/material";
import { TimeIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HospitalMenu } from "../../../MenuBarItems/HospitalMenu";
import { Navigation } from "../../../components/default/Navigation";
import { Toast } from "../../../components/default/Toast";
import { useFindJobById } from "../../../controller/viewHooks/jobHooks";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { ToastProps } from "../../../typeDefs/ToastProps";
import { useFindJobApplicationByJobIdAndStatus} from "../../../controller/viewHooks/JobApplication/JobApplicationDao";
import { STATUS } from "../../../enums/Status";
import { Modal } from "../../../components/default/Modal";
import { useChangeJobApplicantStatusByHospitalAdmin } from "../../../controller/dmlHooks/JobApplication/JobApplicationController";

export const JobDetail = () => {
  const { id } = useParams();
  const [page, setPage] = useState<PaginationInput>({
    pageNumber: 0,
    pageSize:10,
    sort: "id"
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event;
    setPage({ ...page, pageNumber: value - 1 });
  };
  const { jobDetail, jobDetailIsLoading } = useFindJobById(Number(id));
  const [toastProps] = useState<ToastProps>({
    message: '',
    open: false,
    severity: 'info'
  })
  const [showRequirement, setShowRequirement] = useState(false);
  const [showApplicant, setShowApplicant] = useState(false);
  const [status, setStatus] = useState<any>(STATUS.APPENDING);
  const [applicationStatus, setApplicationStatus] = useState<any>('');
  const jobApplication = useFindJobApplicationByJobIdAndStatus(Number(id), page,status);
  const saveStatus=useChangeJobApplicantStatusByHospitalAdmin(Number(id),applicationStatus);
  console.log(jobDetail)
  const saveApplicationStatus=()=>{
    saveStatus.saveJobApplicationStatusHandler();
    if(saveStatus.hasFinishLoading){
    alert(saveStatus.result);
    jobApplication.refetch();}

  }
  const applicationModal=<Modal id="applicationModal" title={status+" Application"} actionBtn={
  <Button onClick={()=>saveApplicationStatus()} className="text-white bg-primary fw-bold">Yes</Button>}>
    <div className="p-5 text-center">
    are you sure you want to {status} this application?
    </div>
  </Modal>
  return (
    <Navigation items={HospitalMenu}>
      <div className="d-flex justify-content-center align-content-center">
      </div>
      {!jobDetailIsLoading &&
        <>
          <Card elevation={4} className="p-2 rounded-0">
            <div className="px-3">
              <h4 className="card-title mb-4">{jobDetail.title}</h4>
              <div className="card-text mb-2"><b><Description /> </b>{String(jobDetail.description)}</div>
              <div className="card-text mb-2"><b>DeadLine </b>{String(jobDetail.deadline).split('T')[0]}</div>
              <div className="card-text"><b>Status</b> {jobDetail.status} <span
                className="badge bg-success"> </span>
              </div>
              <div className="text-md-end p-2"><TimeIcon /> Posted at {String(jobDetail.timeStamp).split('T')[0]}</div>
            </div>

            <Divider className="border border-2 border-dark-subtle" />

            <div className="card-body p-3">
              <h4 className="card-title fw-bold py-2">Job Requirement</h4>
              {
                showRequirement &&<div>
                  <div dangerouslySetInnerHTML={{__html:jobDetail.jobRequirement}}></div>
                </div>
              }
            </div>

            <div className="text-center">
              <span onClick={() => setShowRequirement(!showRequirement)} className="text-black fw-bold">{!showRequirement ? <KeyboardArrowDown /> : <KeyboardArrowUp />}</span>
            </div>

          </Card>

          <Card className="card text-white bg-primary p-2 mt-4">
            <div className="card-body">
              <h4 className="card-title">Applicant</h4>
              <Button onClick={()=>setStatus(STATUS.APPENDING)} className={status==STATUS.APPENDING?"btn text-black border fw-bold rounded-0 bg-info mx-2":"btn text-black border fw-bold rounded-0 bg-white mx-2"}>Appending</Button>
              <Button onClick={()=>setStatus(STATUS.APPROVE)} className={status==STATUS.APPROVE?"btn text-black border fw-bold rounded-0 bg-info mx-2":"btn text-black border fw-bold rounded-0 bg-white mx-2"}>Approved</Button>
              <Button onClick={()=>setStatus(STATUS.CANCEL)} className={status==STATUS.CANCEL?"btn text-black border fw-bold rounded-0 bg-info mx-2":"btn text-black border fw-bold rounded-0 bg-white mx-2"}>Rejected</Button>

            </div>
            <div className="mx-4">  Page {jobApplication.jobApplication.totalPages>0?<>{jobApplication.jobApplication.pageNumber+ 1}</>:0} out of {jobApplication.jobApplication.totalPages}  <span>
              <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
            </span>
              <span className="float-end"> Sort by<select onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
                <option selected={page.sort == 'student.user.name' ? true : false} value={"student.user.name"}>Name</option>
                <option selected={page.sort == 'student.school.name' ? true : false} value="student.school.name">School</option>
                <option selected={page.sort == 'student.department.name' ? true : false} value="student.department.name">Department</option>
                <option selected={page.sort == 'timeStamp' ? true : false} value="timeStamp">Application Date</option>
              </select><Sort /></span>
              <Pagination className="mx-2"
                count={jobApplication.jobApplication.pageSize}
                page={jobApplication.jobApplication.pageNumber}
                onChange={handleChange}
              />
            </div>
            <div className="text-center text-white">
              <span onClick={() => setShowApplicant(!showApplicant)} className="fw-bold">{!showApplicant ? <KeyboardArrowDown /> : <KeyboardArrowUp />}</span>
            </div>
          </Card>

          <>
            {showApplicant&&jobApplication.jobApplication.content.map((data: any, index:number) => {
              return <Card key={index} className="p-3 rounded-0 row mt-3 m-auto" elevation={4}>
                <section className="col-sm-3 text-center">
                  <img style={{ objectFit: 'contain' }} width={'100%'} src={data.student.user.profilePicture} alt="" />
                </section>
                <section className="card-body col-sm-5">
                  <div className="mb-2"><AccountBoxRounded />{data.student.user.name}</div>
                  <div className="mb-2"><Wc />{data.student.user.gender}</div>
                  <div className="mb-2"><AccountBoxRounded />{data.student.user.email}</div>
                  <div className="mb-2"><Phone />{data.student.user.phoneNumber}</div>
                </section>
                <section className="col-sm-4">
                  <div className="mb-2"><School /> {data.student.school.name}</div>
                  <div className="mb-2"><FolderSpecial /> {data.student.department.name}</div>
                  <div className="mb-2"><School /> {data.student.status}</div>
                </section>
                <Divider className="border border-2 border-black" />
                <div className="modal-footer pt-3">
                  <Tooltip placement="top" TransitionComponent={Zoom} title="Reject Application">
                    <Cancel onClick={()=>setApplicationStatus(STATUS.CANCEL)} data-bs-toggle="modal" data-bs-target="#applicationModal" className="text-danger mx-1 mb-2" />
                  </Tooltip>
                  <Tooltip placement="top" TransitionComponent={Zoom} title="Approve Application">
                    <CheckCircle onClick={()=>setApplicationStatus(STATUS.APPROVE)} data-bs-toggle="modal" data-bs-target="#applicationModal" className="text-success mx-1 mb-2" />
                  </Tooltip>
                  <Tooltip placement="top" TransitionComponent={Zoom} title="Application Detail">
                    <ListAlt  className="mx-1 mb-2" />
                  </Tooltip>
                </div>
              </Card>
            })
            }
            {!jobApplication.isLoading&&jobApplication.jobApplication!=undefined&&jobApplication.jobApplication.content!=undefined&&jobApplication.jobApplication.content.length==0&&
            <div className="text-center fw-bold text-white bg-primary p-4 mt-2">
              -- No data found --
              </div>}
          </>
          {applicationModal}
          <Toast message={toastProps.message} severity={toastProps.severity} open={toastProps.open} />
        </>}
    </Navigation>
  )
}