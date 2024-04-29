/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client"
import { AddCircleOutline, Check, Close, Delete, Edit, Save } from "@mui/icons-material"
import { Button, Card, Table, TableBody, TableCell, TableRow } from "@mui/material"
import { useState } from "react"
import { useFaculty } from "../../../controller/viewHooks/SchoolHooks"
import { REGISTER_FACULTY } from "../../../graphQl/mutation/School/Faculty"
import { FacultyInput } from "../../../typeDefs/School/FacultyInput"

export const Faculty = () => {
    const [faculty, setFaculty] = useState<FacultyInput>({
        id: 0,
        name: '',
        schoolId: 1
    });
    const { facultyData, facultyDataIsLoading } = useFaculty(faculty.schoolId);
    const [registerFaculty, setRegisterFaculty] = useState(false);
    const [editFaculty, setEditFaculty] = useState(true);
    const [saveFaculty] = useMutation(REGISTER_FACULTY);
    const saveFacultyHandler = () => {
        saveFaculty({ variables: { input: faculty } }).then(data => console.log(data)).catch(err => err);
    }
    return (
        <>
            <div className="mb-3 mt-3">
                <button className="rounded bg-primary text-white btn"><AddCircleOutline onClick={() => setRegisterFaculty(true)} /></button>
            </div>
            {!facultyDataIsLoading &&
                <Card>
                    <Table>
                        <TableRow className="bg-primary">
                            <TableCell>
                                #
                            </TableCell>
                            <TableCell className="fw-bold text-white">
                                Name
                            </TableCell>
                            <TableCell className="fw-bold text-white">
                                Total Departments
                            </TableCell>
                            <TableCell className="fw-bold text-white">
                                Action
                            </TableCell>
                        </TableRow>
                        <TableBody>
                            {registerFaculty &&
                                <TableRow>
                                    <TableCell>
                                        #
                                    </TableCell>
                                    <TableCell>
                                        <input onChange={(e) => setFaculty({ ...faculty, name: e.target.value })} placeholder="Enter faculty name" className="form-control bg-white" value={faculty.name} />
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
                                        <Button><Save className="mx-1" onClick={() => saveFacultyHandler()} /><Close className="mx-1 text-danger fw-bold" onClick={() => setRegisterFaculty(false)} /></Button>
                                    </TableCell>
                                </TableRow>}
                            {facultyData.map((data: any, index: any) => {
                                return <TableRow key={index}>
                                    <TableCell>
                                        #
                                    </TableCell>
                                    <TableCell>
                                        <input className="border-0 form-control bg-white" disabled={editFaculty ? true : false} value={data.name} />
                                    </TableCell>
                                    <TableCell>
                                        <input className="border-0 form-control bg-white" disabled={true} value={data.departmentList.length} />
                                    </TableCell>
                                    <TableCell>
                                        {!editFaculty && <div><Check className="mx-1" /><Delete className="mx-1" /> <Close onClick={() => setEditFaculty(true)} /></div>}
                                        {editFaculty && <Edit onClick={() => setEditFaculty(false)} />}
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Card>
            }
        </>
    )
}