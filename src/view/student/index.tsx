import { Card, CircularProgress } from "@mui/material";
import { StudentMenu } from "../../MenuBarItems/StudentMenu"
import { Navigation } from "../../components/default/Navigation"
import useFindStudentById from "../../controller/viewHooks/Student/FindStudentById";
import { EmailOutlined, FolderSpecial, KeyboardArrowDown, LocationOn, Person2, Phone, School, WcOutlined } from "@mui/icons-material";
import { TimeIcon } from "@mui/x-date-pickers";
import { useState } from "react";

export const Student = () => {
    const user = JSON.parse(String(localStorage.getItem("userData")));
    const student = useFindStudentById(user.id);
    if (!student.isLoadingStudentData) localStorage.setItem("Student", JSON.stringify({
        id: student.studentDetail.id,
        startingDate: student.studentDetail.startingDate,
        endingDate: student.studentDetail.endingDate,
        status: student.studentDetail.status,
        school: student.studentDetail.school,
        department: student.studentDetail.department,
    }));
    const [showUserDetail, setShowUserDetail] = useState(false);
    const studentData = JSON.parse(String(localStorage.getItem("Student")));
    return (
        <Navigation items={StudentMenu} sideBarClass="bg-info text-white" sideBarProfileClass="bg-info">
            <div>
                {student.isLoadingStudentData && <CircularProgress />}
                {!student.isLoadingStudentData &&
                    <div className="">
                        <Card elevation={4} className="p-2 mb-3 col-sm-12">
                            <img src={studentData.school.logo} width={100} className="float-end" />
                            <div className="mb-2"> <School /> {studentData.school.name}</div>
                            <div className="mb-2">
                                <LocationOn /> {studentData.school.location.Location.Location.name}/{studentData.school.location.Location.name}/{studentData.school.location.name}
                            </div>
                            <div className="mb-2 fw-bold"> <FolderSpecial /> {String(studentData.department.name).split('T')[0]}</div>
                            <div className="text-center">
                                <KeyboardArrowDown onClick={() => setShowUserDetail(!showUserDetail)} />
                            </div>
                        </Card>
                        {showUserDetail && <Card elevation={3} className="row m-auto col-md-9">
                            <div className="col-sm-4">
                                <Card className="col-12 p-0">
                                    <img className="card-img p-0" src={user.profilePicture} alt="" />
                                </Card>
                            </div>
                            <section className="mb-2 col-sm-8 d-flex justify-content-center align-items-center">
                                <div>
                                <div className="mb-2"> <Person2 /> {user.name}</div>
                                <div className="mb-2"> <WcOutlined /> {user.gender}</div>
                                <div className="mb-2"> <Phone /> {user.phoneNumber}</div>
                                <div className="mb-2"> <EmailOutlined /> {user.email}</div>
                                <div className="mb-2"> <TimeIcon /> {String(user.dob).split('T')[0]}</div>
                                </div>
                            </section>
                        </Card>}
                    </div>
                }
            </div>
        </Navigation>
    )
}