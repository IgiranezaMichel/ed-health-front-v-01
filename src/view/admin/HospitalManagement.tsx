/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client"
import { AddBox, AddBusiness, CalendarToday, Delete, LocalHospitalOutlined, LocalHospitalSharp, LocationOnRounded, Sort } from "@mui/icons-material"
import { Button, Card, NativeSelect, Pagination, TextField, TextareaAutosize } from "@mui/material"
import { useState } from "react"
import { AdminMenu } from "../../MenuBarItems/AdminMenu"
import { DashboardCard } from "../../components/default/DashboardCard"
import { Navigation } from "../../components/default/Navigation"
import { useHospital } from "../../controller/viewHooks/Hospital/HospitalHooks"
import { useFilterLocation } from "../../controller/viewHooks/Location/useFilterLocation"
import { REGISTER_HOSPITAL } from "../../graphQl/mutation/hospitalMutations"
import { HospitalInput } from "../../typeDefs/HospitalInput"
import { PaginationInput } from "../../typeDefs/PaginationInput"

export const HospitalManagement = () => {
  const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 6, sort: "name" });
  const { allAvailableHospital, hospitalPageSize, hospitalPageNumber, hospitalSize, isFindingHospital } = useHospital(page);
  const [hospital, setHospital] = useState<HospitalInput>({
    locationId: 0,
    name: '',
    description: '',
    id: 0,
    logo: ''
  })
  const [showAddHospital, setShowAddHospital] = useState(false);
  const [saveHospitalData] = useMutation(REGISTER_HOSPITAL);
  const [districtList, setDistrictList] = useState<any>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<any>();
  const [selecteDistrictId, setSelectedDistrictId] = useState<any>();
  const [sectorList, setSectorList] = useState<any>([]);
  const { listOfLocationData, refetch } = useFilterLocation("name", "PROVINCE");
  const handlePageSizeChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event;
    setPage({ ...page, pageNumber: value - 1 });
  };
  const findDistrict = (id: number | undefined) => {
    if (id != undefined) {
      setDistrictList(listOfLocationData[id].locationList);
      setSelectedDistrictId(undefined);
    }
  }
  const findListOfSectorWithInDistrict = (distictId: number) => {
    if (distictId != undefined) {
      setSectorList(districtList[distictId].locationList);
    }
  }
  const imgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setHospital({ ...hospital, logo: reader.result as string })
        console.log(hospital.logo)
      };
      reader.readAsDataURL(file);
    }
  }
  const saveHospitalDataHandler = () => {
    saveHospitalData({ variables: { input: hospital } }).then(data => console.log(data)).catch(err => err);
    refetch();
  }
  const addNewHospitalModal = <Card className="col-sm-5 p-2 bg-body-tertiary" elevation={4}>
    <div className="text-center">Add New Hospital</div>
    <TextField value={hospital.name} onChange={(e) => setHospital({ ...hospital, name: e.target.value })} label="Hospital name" className="form-control mb-2" />
    <TextareaAutosize value={hospital.description} onChange={(e) => setHospital({ ...hospital, description: e.target.value })} placeholder="Description .." className="form-control mb-2" minRows={2} />
    <input type="file" onChange={imgHandler} className="form-control mb-2" />
    <div className="mb-3">
      <div className="mb-3">
        <select onChange={(e) => { setSelectedProvinceId(Number(e.target.value)); findDistrict(Number(e.target.value)) }} className="form-select border border-dark rounded-0">
          <option value={undefined}>Select Province</option>
          {
            listOfLocationData.map((data: any, index: any) => {
              return <option key={index} value={index}>{data.name}</option>
            })}
        </select>
      </div>
      {selectedProvinceId != undefined &&
        <div className="mb-3">
          <select onChange={(e) => { setSelectedDistrictId(Number(e.target.value)); findListOfSectorWithInDistrict(Number(e.target.value)) }} className="form-select mb-3  border border-dark rounded-0">
            <option value={undefined}>Select District</option>
            {
              districtList.map((data: any, index: any) => {
                return <option key={index} value={index}>{data.name}</option>
              })}
          </select>
        </div>}
      {selecteDistrictId != undefined &&
        <div className="mb-3">
          <select onChange={(e) => setHospital({ ...hospital, locationId: Number(e.target.value) })} className="form-select  border border-dark rounded-0">
            <option value={undefined}>Select Sector</option>
            {
              sectorList.map((data: any, index: any) => {
                return <option key={index} value={data.id}>{data.name}</option>
              })}
          </select>
        </div>}
    </div>
    <div className="modal-footer">
      <Button onClick={() => saveHospitalDataHandler()} className="bg-primary text-white fw-bold">Submit</Button>
    </div>
  </Card>
  return (
    <Navigation items={AdminMenu}>
      <div className="container-lg m-auto">
        <div>
          <div className="col-sm-4 mb-4">
            <DashboardCard title="Available Hospital" icon={<LocalHospitalOutlined className="fs-1 float-end" />} size={hospitalSize} subtitleDescription="Total available hospital" />
          </div>
          <AddBox className="fs-1 mb-3" onClick={() => setShowAddHospital(!showAddHospital)} />
          {/* add new hospital */}
          {showAddHospital ? addNewHospitalModal : ''}
          {hospitalPageSize != 0 &&
            <div>  Page {hospitalPageNumber + 1} out of {hospitalPageSize}  <span>
              <NativeSelect onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
              >
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="18">18</option>
                <option value="24">24</option>
                <option value="30">30</option>
              </NativeSelect>
            </span>
              <span className="float-end"> Sort by <Sort />
                <NativeSelect onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
                  <option selected={page.sort == 'name' ? true : false} value={"name"}>Name</option>
                  <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
                  <option selected={page.sort == 'timeStamp' ? true : false} value="timeStamp">Date of registration</option>
                </NativeSelect>
              </span>
              <Pagination
                count={hospitalPageSize}
                page={hospitalPageNumber + 1}
                onChange={handlePageSizeChange}
              />
            </div>}
        </div>
        {!isFindingHospital && <><div className="row m-auto g-3 col-12">
          {allAvailableHospital.map((data: any, index: any) => {
            return <div key={index} className="col-sm-3">
              <Card elevation={4}>
                <div className="text-center">
                  <img  height={'100vh'} src={data.logo} alt="" />
                </div>
                <div className="card-body bg-light px-2">
                  <div><LocalHospitalSharp /> <b>{data.name}</b></div>
                  <div><LocationOnRounded />{data.location.Location.Location.name}/{data.location.Location.name}/{data.location.name}</div>
                  <div><CalendarToday /> {String(data.timeStamp).split('T')[0]}</div>
                  <div className="modal-footer">
                    <Button>
                      <Delete /> <AddBusiness />
                    </Button>
                  </div>
                </div>

              </Card>
            </div>
          })}
        </div><div>
            {allAvailableHospital.length == 0 && <section className="text-center fw-bold p-4">
              -- No hospital found
            </section>}
          </div></>
        }
      </div>
    </Navigation>
  )
}