import { useState } from "react"
import { AdminMenu } from "../../../MenuBarItems/AdminMenu"
import { Navigation } from "../../../components/default/Navigation"
import { SchoolComponent } from "./component/SchoolComponent"
import { DataContextInput } from "../../../typeDefs/dateContextInput"
import { PaginationInput } from "../../../typeDefs/PaginationInput"
import { useSchoolPage } from "../../../controller/viewHooks/SchoolHooks"
import { HospitalContext } from "../../../context/hospitalContext"
import { SwapVert } from "@mui/icons-material"
import { NativeSelect, Pagination } from "@mui/material"

export const SchoolManagement = () => {
  const [page, setPage] = useState<PaginationInput>({
    pageNumber: 0,
    pageSize: 8,
    sort: "name"
  })
  const school = useSchoolPage(page);
  const handlePageSizeChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event;
    setPage({ ...page, pageNumber: value - 1 });
  };
  const data: DataContextInput = {
    data: school,
    update: () => school.refetch()
  }
  return <HospitalContext.Provider value={data}>
    <Navigation items={AdminMenu}>
      <SchoolComponent accessedBy="admin">
        {!school.schoolDataIsLoading&&<div>  Page {school.schoolPageNumber + 1} out of   <span>
          <NativeSelect onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
          >
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="24">24</option>
            <option value="32">32</option>
            <option value={school.schoolSize}>All</option>
          </NativeSelect>
        </span>
          <span className="float-end"> Sort by<SwapVert/><NativeSelect onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
            <option selected={page.sort == 'name' ? true : false} value={"name"}>Name</option>
            <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
          </NativeSelect></span>
          <Pagination
            count={school.totalPage}
            page={school.schoolPageNumber + 1}
            onChange={handlePageSizeChange}
          />
        </div>}
      </SchoolComponent>
    </Navigation>
  </HospitalContext.Provider>
}