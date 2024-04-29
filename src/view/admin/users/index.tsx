/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close, Email, ListAlt, Phone, School, Sort } from "@mui/icons-material";
import { Avatar, Card, Dialog, NativeSelect, Pagination, Table, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { useState } from "react";
import { DashboardCard } from "../../../components/default/DashboardCard";
import { useFindListOfUserByRole } from "../../../controller/viewHooks/User/FindListOfUserByRole";
import { Role } from "../../../enums/Role";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import UserInformation from "./userInformationIndex";

export default function UserList(props: { role: Role }) {
  const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 10, sort: "id" });
  const [studentId, setStudentId] = useState(0);
  const [openStudentDetail, setOpenStudentDetail] = useState(false);
  const { userListIsAvailable, users } = useFindListOfUserByRole(props.role, page);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event;
    setPage({ ...page, pageNumber: value - 1 });
  };
  return (
    <>
      <div className="col-sm-4 my-4">
        <DashboardCard icon={<School className="float-end fs-1" />} size={users.size} title={"Available " + props.role} subtitleDescription="Total" />
      </div>
      <main>
        {users.totalPages != 0 && <div>  Page {users.pageNumber + 1} out of {users.totalPages}  <span>
          <NativeSelect onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value={users.size}>All</option>
          </NativeSelect>
        </span>
          <span className="float-end"> Sort by <Sort /><NativeSelect onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
            <option selected={page.sort == 'id' ? true : false} value={"id"}>Registration</option>
            {Role.STUDENT && <option selected={page.sort == 'studentList.school' ? true : false} value="studentList.school">Same school</option>}
            <option selected={page.sort == 'name' ? true : false} value="name">Name</option>
            <option selected={page.sort == 'gender' ? true : false} value="gender">Gender</option>
            <option selected={page.sort == 'phoneNumber' ? true : false} value="phoneNumber">Phone Number</option>
          </NativeSelect></span>
          <Pagination
            count={users.totalPages}
            page={users.pageNumber + 1}
            onChange={handleChange}
          />
        </div>
        }
        <Card className="mt-4 rounded-0">
          <Table >
            <TableRow className="bg-primary text-white">
              <TableCell className="fw-bolder">Profile</TableCell>
              <TableCell className="fw-bolder">Contact</TableCell>
              <TableCell className="fw-bolder">Action</TableCell>
            </TableRow>
            <TableBody>
              {userListIsAvailable && users.content.map((data: any) => {
                return <TableRow>
                  <TableCell>
                    <Tooltip arrow title={<div><img src={data.profilePicture} height={'100vh'} /></div>}>
                      <section className="d-flex">
                        <Avatar className="bg-black" src={data.profilePicture} />
                        <div className="card d-flex justify-content-center border-0 mx-2">
                          {data.name}
                        </div>
                      </section>
                    </Tooltip>
                    <div className="mt-2 fw-bold"><i className="bi bi-gender-ambiguous" aria-hidden="true"></i>{data.gender}</div>
                  </TableCell>
                  <TableCell>
                    <div className='mb-2'><Email /> {data.email}</div>
                    <div><Phone />{data.phoneNumber}</div>
                  </TableCell>
                  <TableCell>
                    <button className="btn btn-outline-primary"><ListAlt className="" onClick={() => { setStudentId(Number(data.id)); setOpenStudentDetail(true) }} /></button>
                  </TableCell>
                </TableRow>
              })
              }

            </TableBody>
          </Table>
        </Card>
        {
          userListIsAvailable && users.content.length == 0 &&
          <div className="text-center p-3 bg-primary text-white fw-bolder">
            No data found
          </div>
        }
      </main>
      <Dialog maxWidth="sm" PaperProps={{ className: 'col rounded-0' }} open={openStudentDetail}>
        <div className="p-3 sticky-top bg-white fw-bold">Student Detail <Close onClick={() => setOpenStudentDetail(false)} className="float-end bg-danger text-white" /></div>
        <UserInformation userId={studentId} />
      </Dialog>

    </>
  )
}
