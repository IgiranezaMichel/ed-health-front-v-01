import { BusinessCenterOutlined, DataSaverOn, DoNotDisturb, Edit, HdrStrongOutlined, ListAltOutlined, Sort, Visibility } from "@mui/icons-material"
import { Button, Card, Divider, Pagination, Skeleton, Stack, Tooltip } from "@mui/material"
import { TimeIcon } from "@mui/x-date-pickers"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { HospitalMenu } from "../../../MenuBarItems/HospitalMenu"
import { DashboardCard } from "../../../components/default/DashboardCard"
import { Navigation } from "../../../components/default/Navigation"
import { useFindJobById, useGetListOfPostedJobs } from "../../../controller/viewHooks/jobHooks"
import { JobStatus } from "../../../enums/JobStatus"
import { PaginationInput } from "../../../typeDefs/PaginationInput"
import { JobModal } from "../Training/components/JobModal"

export const Job = () => {
  const [selected, setIsSelected] = useState(0);
  const [status, setStatus] = useState<JobStatus>(JobStatus.ACTIVE);
  useFindJobById(302);
  const [page, setPage] = useState<PaginationInput>({
    pageNumber: 0,
    pageSize: 8,
    sort: "deadline"
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event;
    setPage({ ...page, pageNumber: value - 1 });
  };

  const navigate = useNavigate();

  const { listOfPostedJob, jobHasFinishLoading, jobPageNumber, jobSize, jobTotalPage } = useGetListOfPostedJobs(1, page, status);
  return (
    <>
      <Navigation items={HospitalMenu}>
        <div className="d-flex justify-content-center align-content-center">
          {
            !jobHasFinishLoading && <div className="d-flex justify-content-center align-content-center">
              <Skeleton width={'90%'} />
              <Skeleton width={'90%'} />
              <Skeleton width={'90%'} />
            </div>
          }
        </div>
        {jobHasFinishLoading &&
          <main className="container-lg">
            <main className="row col-sm-12 mt-4" style={{ clear: 'left' }}>

              <section className="col-sm-6 float-end mb-3">
                <DashboardCard title={"Total " + status.toLocaleLowerCase() + " Jobs"}
                  size={jobSize}
                  subtitleDescription={status.toLocaleLowerCase() + " Job"}
                  icon={<BusinessCenterOutlined className="float-end fs-1" />} />
              </section>
            </main>
            {/* modal */}
            <Card elevation={4} variant="elevation" className="bg-body-secondary p-3">
              <div className="mb-3" style={{ clear: 'right' }}>
                <button data-bs-toggle="modal"
                  data-bs-target={'#createJob'} className="rounded bg-primary text-white"><DataSaverOn /></button>
              </div>
              <div className="col-sm-12" style={{ clear: 'right' }}>
                <Button onClick={() => { setIsSelected(0); setStatus(JobStatus.ACTIVE) }} variant={selected == 0 ? "contained" : "outlined"} className="rounded-0 fw-bold"><ListAltOutlined />Active Jobs</Button>
                <Button onClick={() => { setIsSelected(1); setStatus(JobStatus.INACTIVE) }} variant={selected == 1 ? "contained" : "outlined"} className="rounded-0 fw-bold"><HdrStrongOutlined />Expired Date Jobs</Button>
                <Button onClick={() => { setIsSelected(2); setStatus(JobStatus.SUSPEND) }} variant={selected == 2 ? "contained" : "outlined"} className="rounded-0 fw-bold"><DoNotDisturb />Suspended Jobs</Button>
                <Button onClick={() => { setIsSelected(3); setStatus(JobStatus.CANCEL) }} variant={selected == 3 ? "contained" : "outlined"} className="rounded-0 fw-bold"><DoNotDisturb />Canceled Jobs</Button>

              </div>
            </Card>
            <JobModal />
            <Divider className="mt-4" />
            <Stack spacing={6} className="mb-4">
              <div>  Page {jobPageNumber + 1} out of {jobTotalPage}  <span>
                <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
                >
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
                  count={jobTotalPage}
                  page={jobPageNumber + 1}
                  onChange={handleChange}
                />
              </div>
            </Stack>
            <div className="row col-12 m-auto justify-content-center">
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                listOfPostedJob.map((data: any, index) => {
                  return <Card key={index} className="col-sm-12 row m-auto border p-0">
                    <section className="col-md-3">
                      <img className="card-img" src={data.picture} alt="" />
                    </section>
                    <section className="col-md-9 d-flex align-items-center">
                      <div className="col-md-12">
                        <h6 className="card-title fw-bold">{data.title}</h6>
                        <div className="card-text"><b style={{ fontFamily: 'serif' }}>Position</b> <span className="badge bg-primary">{data.numberOfEmployee}</span>
                        </div>
                        <div className="text-sm-end">
                          <span style={{ fontFamily: 'serif' }}><TimeIcon /> {String(data.deadline).split('T')[0]} {String(data.deadline).split('T')[1]}</span>
                        </div>
                        <Divider className="border-2" />
                        <div className="card-text mt-1"><span>{data.description}</span>
                        </div>
                        <div className="modal-footer p-2">
                          <Tooltip placement="top" title={"Edit " + data.title + " Job"}>
                            <Edit onClick={() => navigate({ pathname: "/hospital/job-detail/" + data.id })} className="p-1 fs-2 bg-info mx-1 rounded-circle" />
                          </Tooltip>
                          <Tooltip placement="top" title={"View " + data.title + " Job Detail"}>
                            <Visibility onClick={() => navigate({ pathname: "/hospital/job-detail/" + data.id })} className="p-1 fs-2 mx-1 bg-primary text-white rounded-circle" />
                          </Tooltip>

                          <Tooltip placement="top" title={"Cancel " + data.title + " Job"}>
                            <DoNotDisturb className="p-1 fs-2 border bg-danger text-white rounded-circle" />
                          </Tooltip>
                        </div>
                      </div>
                    </section>
                  </Card>
                })
              }
              {
                listOfPostedJob.length==0&&<Card variant="elevation" className="fw-bold p-4 border text-center">
                  -- No data found --
                </Card>
              }
            </div>
          </main>}
      </Navigation>
    </>
  )
}