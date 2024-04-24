/* eslint-disable @typescript-eslint/no-explicit-any */
import { Email, ListAlt, Person, Phone, Sort } from "@mui/icons-material";
import { Pagination, Table, TableBody, TableCell, TableRow } from "@mui/material";
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
          <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2">
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="18">18</option>
            <option value="24">24</option>
          </select>
        </span>
          <span className="float-end"> Sort by<select onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
            <option selected={page.sort == 'id' ? true : false} value={"id"}>Student Id</option>
            <option selected={page.sort == 'name' ? true : false} value="user.name">Name</option>
            <option selected={page.sort == 'gender' ? true : false} value="user.gender">Gender</option>
            <option selected={page.sort == 'status' ? true : false} value="status">Status</option>
            <option selected={page.sort == 'phoneNumber' ? true : false} value="user.phoneNumber">Phone Number</option>
          </select><Sort /></span>
          <Pagination
            count={studentWithSameStatusObj.totalPages}
            page={studentWithSameStatusObj.pageNumber + 1}
            onChange={handleChange}
          />
        </div>
        <Table className="mt-4">
          <TableRow className="bg-primary text-white">
            <TableCell className="fw-bolder">Profile</TableCell>
            <TableCell className="fw-bolder">Name</TableCell>
            <TableCell className="fw-bolder">Contact</TableCell>
            <TableCell className="fw-bolder">Status</TableCell>
            <TableCell className="fw-bolder">Action</TableCell>
          </TableRow>
          <TableBody>
            {!isLoadingStudentDataStatus && studentWithSameStatusObj.content.map((data: any) => {
              return <TableRow>
                <TableCell><img width={120} src={data.user.profilePicture} alt="" /></TableCell>
                <TableCell>
                  <div><Person />{data.user.name}</div>
                  <div><i className="bi bi-gender-ambiguous" aria-hidden="true"></i>{data.user.gender}</div>
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