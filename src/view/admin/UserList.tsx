/* eslint-disable @typescript-eslint/no-explicit-any */
import { Email, ListAlt, Person, Phone, School, Sort } from "@mui/icons-material";
import { Pagination, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { DashboardCard } from "../../components/default/DashboardCard";
import { useFindListOfUserByRole } from "../../controller/viewHooks/User/FindListOfUserByRole";
import { Role } from "../../enums/Role";
import { PaginationInput } from "../../typeDefs/PaginationInput";
import { StudentDetail } from "../school/Student/Detail";

export default function UserList(props:{role:Role}) {
    const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 10, sort: "id" });
    const [studentId, setStudentId] = useState(0);
    const{userListIsAvailable,users}=useFindListOfUserByRole(props.role,page);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      event;
      setPage({ ...page, pageNumber: value - 1 });
    };
    return (
      <>
    <div className="col-sm-4 my-4">
    <DashboardCard icon={<School className="float-end fs-1"/>} size={users.size} title={"Available "+props.role}  subtitleDescription="Total"/>
    </div>
        {
          studentId==0&&<main>
          <div>  Page {users.pageNumber + 1} out of {users.totalPages}  <span>
            <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value={users.size}>All</option>
            </select>
          </span>
            <span className="float-end"> Sort by<select onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
              <option selected={page.sort == 'id' ? true : false} value={"id"}>Registration</option>
              {Role.STUDENT&&<option selected={page.sort == 'studentList.school' ? true : false} value="studentList.school">Same school</option>}
              <option selected={page.sort == 'name' ? true : false} value="name">Name</option>
              <option selected={page.sort == 'gender' ? true : false} value="gender">Gender</option>
              <option selected={page.sort == 'phoneNumber' ? true : false} value="phoneNumber">Phone Number</option>
            </select><Sort /></span>
            <Pagination
              count={users.totalPages}
              page={users.pageNumber + 1}
              onChange={handleChange}
            />
          </div>
          <Table className="mt-4">
            <TableRow className="bg-primary text-white">
              <TableCell className="fw-bolder">Profile</TableCell>
              <TableCell className="fw-bolder">Name</TableCell>
              <TableCell className="fw-bolder">Contact</TableCell>
              <TableCell className="fw-bolder">Action</TableCell>
            </TableRow>
            <TableBody>
              {userListIsAvailable && users.content.map((data: any) => {
                return <TableRow>
                  <TableCell><img width={120} src={data.profilePicture} alt="" /></TableCell>
                  <TableCell>
                    <div><Person />{data.name}</div>
                    <div><i className="bi bi-gender-ambiguous" aria-hidden="true"></i>{data.gender}</div>
                  </TableCell>
                  <TableCell>
                    <div className='mb-2'><Email /> {data.email}</div>
                    <div><Phone />{data.phoneNumber}</div>
                  </TableCell>
                  <TableCell><ListAlt onClick={()=>setStudentId(Number(data.id))}/></TableCell>
                </TableRow>
              })
              }
    
            </TableBody>
          </Table>
          {
            userListIsAvailable && users.content.length == 0 &&
            <div className="text-center p-3 bg-primary text-white fw-bolder">
              No data found
            </div>
          }
          </main>
        }
        <StudentDetail id={studentId} />
      </>
    )
}
