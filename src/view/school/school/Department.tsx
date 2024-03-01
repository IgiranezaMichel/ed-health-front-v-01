/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client"
import { AddCircleOutline, Check, Close, Delete, Edit, Save } from "@mui/icons-material"
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material"
import { useState } from "react"
import { useFaculty } from "../../../controller/viewHooks/SchoolHooks"
import { REGISTER_DEPARTMENT } from "../../../graphQl/mutation/School/DepartmentMutation"
import { DepartmentInput } from "../../../typeDefs/School/DepartmentInput"

export const Department = () => {
    const [department, setDepartment] = useState<DepartmentInput>({
        id: 0,
        name: '',
        facultyId: 0
    });
    const school=JSON.parse(String(localStorage.getItem("school")));
    const { facultyData, facultyDataIsLoading } = useFaculty(Number(school.id));
    const [registerDepartment, RegisterDepartment] = useState(false);
    const [editDepartment, EditDepartment] = useState(true);
    const [saveDepartment] = useMutation(REGISTER_DEPARTMENT);
    const saveFacultyHandler = () => {
        saveDepartment({ variables: { input: department } }).then(data => console.log(data)).catch(err => err);
    }
    return (
        <>
            <div className="mb-3 mt-3">
                <button className="rounded bg-primary text-white"><AddCircleOutline onClick={() => RegisterDepartment(true)} /></button>
            </div>
            {!facultyDataIsLoading &&
                <Table>
                    <TableRow>
                        <TableCell>
                            #
                        </TableCell>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Total Departments
                        </TableCell>
                        <TableCell>
                            Action
                        </TableCell>
                    </TableRow>
                    <TableBody>
                    {registerDepartment&&<TableRow>
                        <TableCell>
                            #
                        </TableCell>
                        <TableCell>
                        <input onChange={(e)=>setDepartment({...department,name:e.target.value})} placeholder="Enter faculty name" className="form-control bg-white"  value={department.name}/>
                        </TableCell>
                        <TableCell>
                            <div className="mb-3">
                                <select
                                    className="form-select form-select-lg"
                                  onChange={(e)=>setDepartment({...department,facultyId:Number(e.target.value)})}
                                >
                                    <option value={0}>Select Faculty</option>
                                    {facultyData.map((data:any)=>{return <option value={data.id}>{data.name}</option>})}
                                </select>
                            </div>

                        </TableCell>
                        <TableCell>
                            <Button><Save className="mx-1" onClick={()=>saveFacultyHandler()}/><Close className="mx-1 text-danger fw-bold" onClick={()=>RegisterDepartment(false)}/></Button>
                        </TableCell>
                    </TableRow>}
                    {facultyData.map((data:any,index:any)=>{
                        return <TableRow key={index}>
                        <TableCell>
                           {index+1}
                        </TableCell>
                        <TableCell>
                        <input className="border-0 form-control bg-white" disabled={editDepartment?true:false} value={data.name}/>
                        </TableCell>
                        <TableCell>
                            <input className="border-0 form-control bg-white" disabled={true} value={'Total Departments'}/>
                        </TableCell>
                        <TableCell>
                            {!editDepartment&&<div><Check className="mx-1"/><Delete className="mx-1"/> <Close onClick={()=>EditDepartment(true)}/></div> }
                            {editDepartment&&<Edit onClick={()=>EditDepartment(false)}/>}
                        </TableCell>
                    </TableRow>
                    })}
                    </TableBody>
                </Table>
                // <div>
                //     {facultyData.map((data: any) => {
                //         return <div>
                //             <Table>
                //                 <TableHead>
                //                     <TableRow>
                //                         <TableCell colSpan={3} className="text-center mb-3"><span className="display-6"><b>Faculty </b>{data.name}</span></TableCell>
                //                     </TableRow>
                //                     <TableRow>
                //                         <TableCell> Department Name</TableCell>
                //                         <TableCell> Total course</TableCell>
                //                         <TableCell> Total credit</TableCell>
                //                     </TableRow>
                //                 </TableHead>
                //                 <TableBody>
                //                     {data.departmentList.map((data: any) => {
                //                         return <TableRow>
                //                             <TableCell>{data.name}</TableCell>
                //                             <TableCell>{data.totalCourse}</TableCell>
                //                             <TableCell>{data.totalCredit}</TableCell>
                //                         </TableRow>
                //                     })}
                //                     <TableRow className="bg-dark text-white">
                //                         <TableCell className="text-white">Total Departments</TableCell>
                //                         <TableCell></TableCell>
                //                         <TableCell className="text-white">{data.departmentList.length}</TableCell>
                //                     </TableRow>
                //                 </TableBody>
                //             </Table>
                //         </div>
                //     })}
                // </div>
            }
        </>
    )
}