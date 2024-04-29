/* eslint-disable @typescript-eslint/no-explicit-any */
import { Email, ListAlt,Phone, Sort } from "@mui/icons-material";
import { Avatar, Card, NativeSelect, Pagination, Table, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { useState } from "react";
import { useShowStudentFromSameSchoolHavingSameStatus } from "../../../controller/viewHooks/Student/FindStudentFromSameSchoolByStatus";
import { StudentStatus } from "../../../enums/StudentStatus";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { StudentDetail } from "./detail";

export const Graduate = (props: { schoolId: number, status: StudentStatus }) => {
  const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 6, sort: "id" });
  const [studentId, setStudentId] = useState(0);
  const { isLoadingStudentDataStatus, studentWithSameStatusObj } = useShowStudentFromSameSchoolHavingSameStatus(props.schoolId, props.status, page);
  console.log(studentWithSameStatusObj)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event;
    setPage({ ...page, pageNumber: value - 1 });
  };
  return (
    <>
      {
        studentId==0&&<main>
        <div>  Page {studentWithSameStatusObj.pageNumber + 1} out of {studentWithSameStatusObj.totalPages}  <span>
          <NativeSelect onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2">
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="18">18</option>
            <option value="24">24</option>
          </NativeSelect>
        </span>
          <span className="float-end"> Sort by <Sort /> <NativeSelect onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
            <option selected={page.sort == 'id' ? true : false} value={"id"}>Student Id</option>
            <option selected={page.sort == 'name' ? true : false} value="user.name">Name</option>
            <option selected={page.sort == 'gender' ? true : false} value="user.gender">Gender</option>
            <option selected={page.sort == 'status' ? true : false} value="status">Status</option>
            <option selected={page.sort == 'phoneNumber' ? true : false} value="user.phoneNumber">Phone Number</option>
          </NativeSelect></span>
          <Pagination
            count={studentWithSameStatusObj.totalPages}
            page={studentWithSameStatusObj.pageNumber + 1}
            onChange={handleChange}
          />
        </div>
        <Card className="mt-4" elevation={4}>
        <Table >
          <TableRow className="bg-primary text-white">
            <TableCell className="fw-bolder">Profile</TableCell>
            <TableCell className="fw-bolder">Contact</TableCell>
            <TableCell className="fw-bolder">Status</TableCell>
            <TableCell className="fw-bolder">Action</TableCell>
          </TableRow>
          <TableBody>
            {!isLoadingStudentDataStatus && studentWithSameStatusObj.content.map((data: any) => {
              return <TableRow>
                <TableCell>
                <Tooltip arrow title={<div><img src={data.user.profilePicture} height={'100vh'} /></div>}>
                    <section className='d-flex'>
                    <Avatar  className="bg-dark" src={data.user.profilePicture}  />
                    <div className="card mx-2 d-flex justify-content-center border-0 p-0">
                    {data.user.name}
                    </div>
                    </section>
                  </Tooltip>
                  <div className='mt-2 mx-3 fw-bold'><i className="bi bi-gender-ambiguous" aria-hidden="true"></i>{data.user.gender}</div>
                  </TableCell>
                <TableCell>
                  <div className='mb-2'><Email /> {data.user.email}</div>
                  <div><Phone />{data.user.phoneNumber}</div>
                </TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell><ListAlt onClick={()=>setStudentId(Number(data.id))}/></TableCell>
              </TableRow>
            })
            }
  
          </TableBody>
        </Table>
        </Card>
        {
          !isLoadingStudentDataStatus && studentWithSameStatusObj.content.length == 0 &&
          <div className="text-center p-3 bg-primary text-white fw-bolder">
            No data found
          </div>
        }
        </main>
      }
      {studentId!=0&&<StudentDetail id={studentId} />}
    </>
  )
}