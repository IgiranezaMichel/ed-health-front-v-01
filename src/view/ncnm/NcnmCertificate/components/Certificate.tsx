/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookmarkSharp, List, LocationOn, ModelTrainingSharp, Sort } from "@mui/icons-material"
import { Avatar, Card, CircularProgress, Divider, NativeSelect, Pagination, Tooltip } from "@mui/material"
import { useState } from "react"
import { useCertificatePage } from "../../../../controller/viewHooks/useCertificatePage"
import { PaginationInput } from "../../../../typeDefs/PaginationInput"
import { CertificateDetail } from "./CertificateDetail"

export const Certificate = () => {
  const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 8, sort: "title" });
  const { certificatesDetail, isLoadingCertificates } = useCertificatePage(page);
  console.log(certificatesDetail)
  const [certificateId, setCertificateId] = useState(0);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event;
    setPage({ ...page, pageNumber: value - 1 });
  };
  return (
    <>
      {
        isLoadingCertificates && <div className="d-flex justify-content-center align-content-center"><CircularProgress /></div>
      }
      {(!isLoadingCertificates && certificateId == 0)
        ? <div className="col-12 bg">
          {certificatesDetail.totalPages!=0&&<div className="mt-4 mb-4">  Page {certificatesDetail.pageNumber + 1} out of {certificatesDetail.totalPages}  <span>
            <NativeSelect onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
            >
              <option value="8">8</option>
              <option value="16">18</option>
              <option value="24">24</option>
            </NativeSelect>
          </span>
            <span className="float-end"> Sort by <Sort/>
            <NativeSelect onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
              <option selected={page.sort == 'description' ? true : false} value="description">Description</option>
              <option selected={page.sort == 'deadline' ? true : false} value="deadline">Deadline</option>
              <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
            </NativeSelect></span>
            <Pagination count={certificatesDetail.totalPages} onChange={handleChange} page={certificatesDetail.pageNumber + 1} />
          </div>}

          {certificatesDetail.content.map((data: any, index: any) => {
            return <Card key={index} elevation={3} className="mb-2 p-1 col-sm-12 m-auto row rounded-0">
              <section className="col-md-3 card p-0 border-0">
                <div className="text-center d-flex"><Tooltip arrow className="card" title={<div>
                  <img src={data.training.hospital.logo} className="card-img" />
                </div>}>
                  <Avatar src={data.training.hospital.logo} />
                </Tooltip>
                  <div className="card justify-content-center border-0">
                    {data.training.hospital.name}
                  </div> </div>
                <div className="text-center"><LocationOn />{data.training.hospital.location.Location.Location.name} || {data.training.hospital.location.Location.name} || {data.training.hospital.location.name} </div>
              </section>
              <section className="col-md-8 d-flex align-items-center">
                <div>
                  <div className="d-flex">
                    <section className="d-flex">
                      <div className="card border-0 p-1 fs-1 justify-content-center">
                        <ModelTrainingSharp className="bg-success p-1 fs-1 rounded-circle text-white"/>
                      </div>
                      <div className="card border-0">
                        <div> <span className="d-block"><small style={{ fontFamily: 'fantasy' }}>Training title</small> {data.training.title}</span></div>
                        <div> <span className="d-block"><small style={{ fontFamily: 'fantasy' }}>Training Location</small> {data.training.location.name}</span></div>
                        <div>
                          <small style={{ fontFamily: 'fantasy' }}>Total Trainer </small><small className="badge bg-success fw-bold">{data.training.trainers.length}</small>
                        </div>
                      </div>
                    </section>
                    <section className="d-sm-flex mx-md-4">
                      <div className="card border-0 p-1 fs-1 justify-content-center">
                        <BookmarkSharp className="bg-primary p-1 fs-1 rounded-circle text-white"/>
                      </div>
                      <div className="card border-0">
                        <div> <small className="d-block"><span style={{ fontFamily: 'fantasy' }}>Certificate Name</span> {data.title}</small></div>
                        <div> <small className="d-block"><span style={{ fontFamily: 'fantasy' }}>Issued Date</span> {String(data.timeStamp).split('T')[0]} {String(data.timeStamp).split('T')[1].split('.')[0]}</small></div>
                        <div><small style={{ fontFamily: 'fantasy' }}>Total Applicant </small><small className="badge bg-success fw-bold">{data.training.applicantList.length}</small></div>
                      </div>
                    </section>
                  </div>
                </div>
              </section>
              <div className="modal-footer">
                    <small style={{ fontFamily: 'fantasy' }}>Signed by </small>{data.accountHolder.name}
              </div>
              <Divider className="border-1 my-2 border-dark" />
              <div className="modal-footer"><List onClick={() => setCertificateId(Number(data.id))} /></div>
            </Card>
          })}
        </div> : certificateId != 0 ? <CertificateDetail certificateId={certificateId} /> : <></>

      }
      {certificatesDetail.totalPages==0&&<div className="text-center p-4 bg-body-secondary">-- No data found --</div>}
    </>
  )
}
