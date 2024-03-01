/* eslint-disable @typescript-eslint/no-explicit-any */

import { Email, List, Person, Phone, Sort } from '@mui/icons-material';
import { Pagination, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import useStudentFromSameSchoolListPage from '../../../controller/viewHooks/Student/StudentFromSameSchoolListPage';
import { PaginationInput } from '../../../typeDefs/PaginationInput';
import { StudentDetail } from './Detail';

export const AllStudent = (props:{refresh:boolean}) => {
  const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 6, sort: "id" });
  const school=JSON.parse(String(localStorage.getItem('school')));
  const { isLoadingStudentData, studentObj,refetchStudentObj} = useStudentFromSameSchoolListPage(Number(school.id), page);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event
    setPage({ ...page, pageNumber: value - 1 });
  };
  if(props.refresh)refetchStudentObj();
  
  const [studentId, setStudentId] = useState(0);
  return (
    <div className='mt-5'>
      {(!isLoadingStudentData && studentId == 0) && <div>
        <div>  Page {studentObj.pageNumber + 1} out of {studentObj.totalPages}  <span>
          <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
          >
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
            count={studentObj.totalPages}
            page={studentObj.pageNumber + 1}
            onChange={handleChange}
          />
        </div>
        <Table>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
          <TableBody>
            {!isLoadingStudentData && studentObj.content.map((data: any) => {
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
                <TableCell><List onClick={() => setStudentId(Number(data.id))} /></TableCell>
              </TableRow>
            })
            }
          </TableBody>
        </Table>
      </div>
      }
      {studentId != 0 && <StudentDetail id={studentId} />}
    </div>
  );
}


