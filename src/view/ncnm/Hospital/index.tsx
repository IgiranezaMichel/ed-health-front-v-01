/* eslint-disable @typescript-eslint/no-explicit-any */
import { Delete, ListAlt, LocalHospitalOutlined, LocationOn, Sort } from "@mui/icons-material"
import { Card, CircularProgress, NativeSelect, Pagination, Stack } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { NcnmMenu } from "../../../MenuBarItems/NcnmMenu"
import { DashboardCard } from "../../../components/default/DashboardCard"
import { Navigation } from "../../../components/default/Navigation"
import { useHospital } from "../../../controller/viewHooks/Hospital/HospitalHooks"
import { PaginationInput } from "../../../typeDefs/PaginationInput"

export const NcnmHospital = () => {
  const [page, setPage] = useState<PaginationInput>({
    pageNumber: 0, pageSize: 6, sort: "name"
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event;
    setPage({ ...page, pageNumber: value - 1 });
  };
  const navigate = useNavigate();
  const { allAvailableHospital, hospitalPageNumber, hospitalPageSize, hospitalSize, isFindingHospital } = useHospital(page);
  return (
    <Navigation items={NcnmMenu}>
      <div>
        <span className="display-6" style={{ filter: 'drop-shadow(2px 1px grey' }}>Available Hospital</span>
      </div>
      <div className="col-sm-4">
        <DashboardCard icon={<LocalHospitalOutlined className="fs-1 float-end" />} size={hospitalSize} title="Available Hospitals" subtitleDescription="Total Hospital" />
      </div>
      {isFindingHospital && <div className="d-flex justify-content-center align-content-center">
        <CircularProgress />
      </div>}
      {
        allAvailableHospital && 
       <>
        <div className="row g-3 mt-4">
          <Stack spacing={2}>
            <div>  Page {hospitalPageNumber + 1} out of {hospitalPageSize}  <span>
              <NativeSelect onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="24">24</option>
                <option value="32">32</option>
              </NativeSelect>
            </span>
              <span className="float-end"> Sort by <Sort /><NativeSelect onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
                <option selected={page.sort == 'title' ? true : false} value={"name"}>name</option>
                <option selected={page.sort == 'description' ? true : false} value="description">Description</option>
                <option selected={page.sort == 'deadline' ? true : false} value="jobList">Job Post</option>
                <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
                <option selected={page.sort == 'location' ? true : false} value="hospitalTrainingList">Training</option>
              </NativeSelect></span>
              <Pagination
                count={hospitalPageSize}
                page={hospitalPageNumber + 1}
                onChange={handleChange}
              />
            </div>
          </Stack>
          </div>
          <div className="row g-2 m-auto mt-4">
          {
            allAvailableHospital.map((data: any) => {
              return (
               <div className="rounded-0 col-sm-3">
                 <Card  elevation={9}>
                  <div className="text-center"><img src={data.logo} height={100} /></div>
                  <small className="fw-bold d-block mt-3"><LocalHospitalOutlined />{data.name}</small>
                  <small className="d-block"><LocationOn /> {data.location.Location.Location.name} || {data.location.Location.name} || {data.location.name}</small>
                  <div className="modal-footer mx-2">
                    <ListAlt onClick={() => navigate("/ncnm/hospital-detail/"+ data.id)} className="bg-info text-white m-1" />
                    <Delete className="bg-danger text-white" />
                  </div>
                </Card>
               </div>
              )
            })
          }
        </div>
       </>
      }
    </Navigation>
  )
}