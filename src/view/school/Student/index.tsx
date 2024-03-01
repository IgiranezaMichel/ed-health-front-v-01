/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@apollo/client"
import { HdrStrongOutlined, ListAltOutlined, PersonAddAlt1Outlined, SchoolSharp } from "@mui/icons-material"
import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { SchoolMenu } from "../../../MenuBarItems/SchoolMenu"
import { Modal } from "../../../components/default/Modal"
import { Navigation } from "../../../components/default/Navigation"
import { useFaculty } from "../../../controller/viewHooks/SchoolHooks"
import { Role } from "../../../enums/Role"
import { StudentStatus } from "../../../enums/StudentStatus"
import { REGISTER_STUDENT } from "../../../graphQl/mutation/StudentMutations"
import { AccountHolderInput } from "../../../typeDefs/AccountHolderInput"
import { StudentInput } from "../../../typeDefs/StudentInput"
import { AllStudent } from "./AllStudent"
import { Graduate } from "./Graduate"
export const SchoolStudents = () => {
    const [user, setUser] = useState<AccountHolderInput>({ dob: '', email: '', gender: '', id: 0, name: '', password: '', phoneNumber: '', profilePicture: '', role: Role.STUDENT });
    const school = JSON.parse(String(localStorage.getItem('school')));
    const { facultyData, facultyDataIsLoading } = useFaculty(Number(school.id));
    const [selected, setIsSelected] = useState(0);
    const [facultyId, setFacultyId] = useState(0);
    const [refreshListOfStudent, setRefreshListOfStudent] = useState(false);
    const [student, setStudent] = useState<StudentInput>({
        endingDate: '2024-02-18T00:00:00.000000',
        id: 0,
        schoolId: Number(school.id),
        status: StudentStatus.ACTIVE,
        userId: 0,
        departmentId: 0
    });
    const [registerStudent] = useMutation(REGISTER_STUDENT);
    useEffect(
        () => {

        }, [selected, registerStudent, user, student]
    )
    const ImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setUser({ ...user, profilePicture: reader.result as string })
            };
            reader.readAsDataURL(file);
        }
    }
    const registerStudentHandler = async () => {
        setIsSelected(selected + 1);
        await registerStudent({ variables: { input: student, user: user } })
            .then((data) => { alert(data.data.registerStudent); setRefreshListOfStudent(true) })
            .catch(err => err)
            .finally(() => setRefreshListOfStudent(false));
    }
    const studentForm = <Modal id="saveStudentBtn" title="Register Student" actionBtn={<Button onClick={() => registerStudentHandler()} className="bg-primary text-white">Register</Button>}>
        <div className="p-2">
            {user.profilePicture != '' && <div className="text-center">
                <img width={'50%'} src={user.profilePicture} />
            </div>}
            <TextField value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="form-control mb-2" label="Name" />
            <div className="mb-2">
                <select onChange={(e) => setUser({ ...user, gender: e.target.value })} className="form-select form-select-lg">
                    <option selected>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <TextField value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="form-control mb-2" label="Email" />
            <TextField value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} className="form-control mb-2" label="Phone number" />
            <label htmlFor="Image">Student profile Picture</label>
            <input type="file" onChange={ImageHandler} className="mb-2 mx-2" />
            <label htmlFor="Dob">Date of birth</label>
            <div className="mb-3">
                <select className="form-select form-select-lg" onChange={(e) => setFacultyId(Number(e.target.value))}>
                    <option value={undefined}>Select Faculty</option>
                    {facultyData.map((data: any, index: any) => { return <option value={index}>{data.name}</option> })}
                </select>
            </div>
            {!facultyDataIsLoading && facultyData[facultyId].departmentList.length != 0 && <div className="mb-3">
                <select className="form-select form-select-lg" onChange={(e) => setStudent({ ...student, departmentId: Number(e.target.value) })}>
                    <option value={undefined}>Select Department</option>
                    {facultyData[facultyId].departmentList.map((data: any) => { return <option value={data.id}>{data.name}</option> })}
                </select>
            </div>}
            <input value={user.dob} type="date" onChange={(e) => setUser({ ...user, dob: e.target.value })} className="form-control p-3 mb-3" />
            <TextField value={user.password} type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} className="form-control mb-2" label="Password" />
        </div>
    </Modal>
    return (
        <Navigation items={SchoolMenu}>
            <div className="mb-3">
                <button data-bs-toggle="modal" data-bs-target="#saveStudentBtn" className="rounded bg-primary text-white"><PersonAddAlt1Outlined /></button>
            </div>
            <div>
                <button onClick={() => { setIsSelected(0) }} className={selected == 0 ? "bg-primary text-light" : "bg-white"}><ListAltOutlined /> All Student</button>
                <button onClick={() => setIsSelected(1)} className={selected == 1 ? "bg-primary text-light" : "bg-white"}><HdrStrongOutlined /> Appending Student</button>
                <button onClick={() => { setIsSelected(2); }} className={selected == 2 ? "bg-primary text-light" : "bg-white"}><SchoolSharp />Grandaunts</button>
                <button onClick={() => { setIsSelected(3); }} className={selected == 3 ? "bg-primary text-light" : "bg-white"}><SchoolSharp />Dropout</button>
            </div>
            <div>
                {
                    selected == 0 && <AllStudent refresh={refreshListOfStudent} />
                }
                {
                    selected == 1 && <Graduate status={StudentStatus.ACTIVE} schoolId={Number(school.id)} />
                }
                {
                    selected == 2 && <Graduate status={StudentStatus.COMPLETE} schoolId={Number(school.id)} />
                }
                {
                    selected == 3 && <Graduate status={StudentStatus.DROPOUT} schoolId={Number(school.id)} />
                }
                {studentForm}
            </div>
        </Navigation>
    )
}