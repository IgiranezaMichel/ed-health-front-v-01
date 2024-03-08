/* eslint-disable @typescript-eslint/no-explicit-any */
import { List, LocalHospital, LocationOn, Sort } from "@mui/icons-material"
import { Card, CircularProgress, Divider, Pagination} from "@mui/material"
import { useState } from "react"
import { useCertificatePage } from "../../../../controller/viewHooks/useCertificatePage"
import { PaginationInput } from "../../../../typeDefs/PaginationInput"
import { CertificateDetail } from "./CertificateDetail"

export const Certificate = () => {
  const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 8, sort: "title" });
  const { certificatesDetail, isLoadingCertificates } = useCertificatePage(page);
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
          <div className="mt-4 mb-4">  Page {certificatesDetail.pageNumber + 1} out of {certificatesDetail.totalPages}  <span>
            <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
            >
              <option value="8">8</option>
              <option value="16">18</option>
              <option value="24">24</option>
            </select>
          </span>
            <span className="float-end"> Sort by<select onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
              <option selected={page.sort == 'description' ? true : false} value="description">Description</option>
              <option selected={page.sort == 'deadline' ? true : false} value="deadline">Deadline</option>
              <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
            </select><Sort /></span>
            <Pagination count={certificatesDetail.totalPages} onChange={handleChange} page={certificatesDetail.pageNumber + 1} />
          </div>

          {certificatesDetail.content.map((data: any, index: any) => {
            return <Card key={index} elevation={5} className="mb-3 p-2 col-sm-12 m-auto row">
              <section className="col-md-4">
                <img src={data.training.hospital.logo} className="card-img" />
                <div className="text-center"><LocalHospital /> {data.training.hospital.name} </div>
                <div className="text-center"><LocationOn />{data.training.hospital.location.Location.Location.name} || {data.training.hospital.location.Location.name} || {data.training.hospital.location.name} </div>
              </section>
              <section className="col-md-8 d-flex align-items-center">
                <div>
                  <span className="d-block"><span style={{ fontFamily: 'fantasy' }}>Training title</span> {data.training.title}</span>
                  <span className="d-block"><span style={{ fontFamily: 'fantasy' }}>Certificate Name </span>Certificate {data.title}</span>
                  <span className="d-block"><span style={{ fontFamily: 'fantasy' }}>Issued Date </span>{String(data.timeStamp).split('T')[0]} {String(data.timeStamp).split('T')[1].split('.')[0]}</span>
                  <div><span style={{ fontFamily: 'fantasy' }}>Total Trainer </span><span className="badge bg-success fw-bold">{data.training.trainers.length}</span></div>
                  <div><span style={{ fontFamily: 'fantasy' }}>Total Applicant </span><span className="badge bg-success fw-bold">{data.training.applicantList.length}</span></div>
                <div><LocationOn />{data.training.location.Location.Location.name} || {data.training.location.Location.name} || {data.training.location.name} </div>
                  <div>
                    <span style={{ fontFamily: 'fantasy' }}>Signed by </span>{data.accountHolder.name}
                  </div>
                </div>
              </section>
              <Divider className="border-2 my-2 border-dark"/>
              <div  className="modal-footer"><List onClick={() => setCertificateId(Number(data.id))} /></div>
            </Card>
          })}
        </div> : certificateId != 0 ? <CertificateDetail certificateId={certificateId} /> : <></>

      }
    </>
  )
}
