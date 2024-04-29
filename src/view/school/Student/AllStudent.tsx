/* eslint-disable @typescript-eslint/no-explicit-any */

import { Email, List, Phone, Sort } from '@mui/icons-material';
import { Avatar, Card, NativeSelect, Pagination, Table, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import { useState } from 'react';
import useStudentFromSameSchoolListPage from '../../../controller/viewHooks/Student/StudentFromSameSchoolListPage';
import { PaginationInput } from '../../../typeDefs/PaginationInput';
import { StudentDetail } from './detail';

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
        {studentObj.totalPages!=0&&<div>  Page {studentObj.pageNumber + 1} out of {studentObj.totalPages}  <span>
          <NativeSelect onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
          >
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="18">18</option>
            <option value="24">24</option>
          </NativeSelect>
        </span>
          <span className="float-end"> Sort by <Sort /><NativeSelect onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
            <option selected={page.sort == 'id' ? true : false} value={"id"}>Student Id</option>
            <option selected={page.sort == 'name' ? true : false} value="user.name">Name</option>
            <option selected={page.sort == 'gender' ? true : false} value="user.gender">Gender</option>
            <option selected={page.sort == 'status' ? true : false} value="status">Status</option>
            <option selected={page.sort == 'phoneNumber' ? true : false} value="user.phoneNumber">Phone Number</option>
          </NativeSelect></span>
          <Pagination
            count={studentObj.totalPages}
            page={studentObj.pageNumber + 1}
            onChange={handleChange}
          />
        </div>}
        <Card className='mt-4' elevation={4}>
        <Table>
          <TableRow className='bg-primary'>
            <TableCell className='fw-bold text-white'>Profile</TableCell>
            <TableCell className='fw-bold text-white'>Contact</TableCell>
            <TableCell className='fw-bold text-white'>Status</TableCell>
            <TableCell className='fw-bold text-white'>Action</TableCell>
          </TableRow>
          <TableBody>
            {!isLoadingStudentData && studentObj.content.map((data: any) => {
              return <TableRow>
                <TableCell>
                  <Tooltip arrow title={<div><img src={data.user.profilePicture} height={'100vh'} /></div>}>
                    <section className='d-flex'>
                    <Avatar  src={data.user.profilePicture}  />
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
                <TableCell>
                  <div className='mb-2'><b>Status: </b>{data.status}</div>
                  <div className='mb-2'><b>Dep: </b>{data.department.name}</div>
                  </TableCell>
                <TableCell><List onClick={() => setStudentId(Number(data.id))} /></TableCell>
              </TableRow>
            })
            }
          </TableBody>
        </Table>
        </Card>
      </div>
      }
      {studentId != 0 && <StudentDetail id={studentId} />}
    </div>
  );
}


