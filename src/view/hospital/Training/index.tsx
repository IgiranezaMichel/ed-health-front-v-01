import { DataSaverOn, DoNotDisturb, HdrStrongOutlined, PsychologyOutlined, SchoolOutlined, SchoolSharp, Sort } from "@mui/icons-material"
import { Card, CircularProgress, Divider, Pagination, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { HospitalMenu } from "../../../MenuBarItems/HospitalMenu"
import { CreateNewTraining } from "../../../components/Training/Modal/CreateNewTraining"
import { Navigation } from "../../../components/default/Navigation"
import { useFindHospitalByHospitalAndNcnmStatus } from "../../../controller/viewHooks/useHospital"
import { STATUS } from "../../../enums/Status"
import { PaginationInput } from "../../../typeDefs/PaginationInput"
import { Training } from "./components/Training"
export const HospitalTraining = () => {
  const [selected, setIsSelected] = useState(0);
  const [page, setPage] = useState<PaginationInput>({
    pageNumber: 0,
    pageSize: 5,
    sort: 'title'
  });
  const [ncnmStatus, setNcnmStatus] = useState("appending")
  const { hasLoaded, trainingList, currentPage, totalPage, size } = useFindHospitalByHospitalAndNcnmStatus(1, ncnmStatus, page);
  useEffect(
    () => {
    },
    [hasLoaded, trainingList, currentPage, totalPage, page]
  )
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event
    setPage({ ...page, pageNumber: value - 1 });
  };
  return (
    <>
      <Navigation items={HospitalMenu}>
        {!hasLoaded && <div>
          <CircularProgress />
        </div>}
        {
          hasLoaded &&
          <main className="row m-auto col-sm-10 mt-4 float-end" style={{ clear: 'left' }}>
            <section className="col-sm-6">
              <Card className="border" elevation={3}>
                <div className="p-2">
                  <PsychologyOutlined className="float-end fs-1" style={{}} />
                  <span className="fw-bolder">Total Training </span>
                  <div>
                    Total Trainings <span className="badge bg-primary">{size}</span>
                  </div>
                </div>
              </Card>
            </section>
            <section className="col-sm-6">
              <Card className="border" elevation={3}>
                <div className="p-2">
                  <SchoolOutlined className="float-end fs-1" style={{}} />
                  <span className="fw-bolder">Approved Training</span>
                  <div>
                    Total Approved <span className="badge bg-primary">{size}</span>
                  </div>
                </div>
              </Card>
            </section>
          </main>
        }
        {/*  */}
        {
          hasLoaded && <div>
            <div className="mb-3" style={{ clear: 'right' }}>
              <button data-bs-toggle="modal"
                data-bs-target="#modalId" className="rounded bg-primary text-white"><DataSaverOn />
              </button>
            </div>
            <div className="col-sm-12" style={{ clear: 'right' }}>
              <button onClick={() => { setIsSelected(0); setNcnmStatus(STATUS.APPENDING) }} className={selected == 0 ? "bg-primary text-white fw-bold" : "bg-white"}><HdrStrongOutlined /> Appending Training</button>
              <button onClick={() => { setIsSelected(1); setNcnmStatus(STATUS.APPROVE) }} className={selected == 1 ? "bg-primary text-white fw-bold" : "bg-white"}><SchoolSharp />Approved Training</button>
              <button onClick={() => { setIsSelected(2); setNcnmStatus(STATUS.CANCEL) }} className={selected == 2 ? "bg-danger text-white fw-bold" : "bg-white"}><DoNotDisturb />Cancelled Training</button>
            </div>
            <Divider className="mt-4" />
            <CreateNewTraining />
            <Training hospitalId={1} page={page} status={ncnmStatus}>
              <div className="form-group mb-4">

                <Stack spacing={2}>
                  <div>  Page {currentPage + 1} out of {totalPage}  <span>
                    <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select>
                  </span>
                    <span className="float-end"> Sort by<select onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
                      <option selected={page.sort == 'title' ? true : false} value={"title"}>Title</option>
                      <option selected={page.sort == 'description' ? true : false} value="description">Description</option>
                      <option selected={page.sort == 'deadline' ? true : false} value="deadline">Deadline</option>
                      <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
                    </select><Sort /></span>
                    <Pagination
                      count={totalPage}
                      page={currentPage + 1}
                      onChange={handleChange}
                    />
                  </div>
                </Stack>
              </div>
            </Training>
          </div>
        }
      </Navigation>
    </>
  )
}