/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocationOn, PersonAddAlt, Phone, RemoveRedEye, School, SchoolOutlined, Visibility, Wc, } from "@mui/icons-material";
import { Avatar, Card, Divider, Tooltip } from "@mui/material";
import { SchoolMenu } from "../../MenuBarItems/SchoolMenu";
import { Navigation } from "../../components/default/Navigation";
import { PIE_CHART_DEFAULT } from "../../components/default/PIECHART";
import { useShowStudentFromSameSchoolStatusStatistics } from "../../controller/viewHooks/Student/ShowStudentFromSameSchoolStatusStatistics";
export const SchoolDashBoard = () => {
  const school = JSON.parse(String(localStorage.getItem("school")));
  const { isLoadingStudentStatusStatistics, studentsStatusStatistics } = useShowStudentFromSameSchoolStatusStatistics(Number(school.id));
  const user = JSON.parse(String(localStorage.getItem("userData")));
  return (
    <div>
      <Navigation items={SchoolMenu}>
        <>
          <section className="row m-auto g-3">
            <section className="col-sm-6 align-content-center">
              <Card className="p-2 rounded-0" elevation={4}>
                <Tooltip title={<div><img src={user.profilePicture} height={'100vh'} alt="" /></div>}>
                  <section className="d-flex">
                    <Avatar className="border bg-black" src={user.profilePicture} />
                    <div className="card mx-2  d-flex justify-content-center border-0">{user.name}</div>
                  </section>
                </Tooltip>
                <div className="d-sm-flex mt-2">
                  <div className="mb-2 mx-1"><Wc className="border border-4 border-black rounded-circle " /> {user.gender}</div>
                  <div className="mb-2 mx-1"><Phone className="border border-4 border-black rounded-circle " /> {user.phoneNumber}</div>
                </div>
              </Card>
            </section>
            <section className="col-sm-6">
              <Card elevation={4} className="rounded-0 d-flex p-3">
                <div className="col-sm-1 card border-0 d-flex justify-content-center">
                  <img src={school.logo} className="card-img" />
                </div>
                <div className="col-sm-12 card d-flex border-0 mx-4 align-content-center justify-content-center">
                  <div>
                    <div className="mb-2"><School /> {school.name}</div>
                    <div className="mb-2"><LocationOn /> {school.location.Location.Location.name} || {school.location.Location.name} || {school.location.name}</div>
                  </div>
                </div>
              </Card>
            </section>
          </section>
          <Divider />
          {!isLoadingStudentStatusStatistics && studentsStatusStatistics.length != 0 &&
            <div className="row col-12 m-auto g-3  mt-2" >
              <section className="col-sm-6  border-3">
              <Card elevation={4} className="rounded-0">
                <div className="fw-bold p-2 mb-2">Student Status</div>
                <PIE_CHART_DEFAULT centerLabel="Student" items={studentsStatusStatistics} />
                <a href="/school/student"><RemoveRedEye className="float-end" /></a>
              </Card>
              </section>
              <section className="col-sm-6 border-0 d-flex align-content-center align-items-center justify-content-center">
              <Card className="col-12 border-0">
                <main className="col-sm-12">
                  <section className="col-sm-12 mb-4">
                    <Card className="border" elevation={3}>
                      <div className="p-2">
                        <School className="float-end fs-1" />
                        <span className="fw-bolder">Total Faculties </span>
                        <div>
                          Total Faculty <span className="badge bg-primary">{school.facultyList.length}</span>
                        </div>
                      </div>
                      <div className="modal-footer border-top p-2 border-2">
                        <a className="mx-2">
                          <Visibility />
                        </a>
                        <a className="mx-3">
                          <PersonAddAlt />
                        </a>
                      </div>
                    </Card>
                  </section>
                  <section className="col-sm-12">
                    <Card className="border" elevation={3}>
                      <div className="p-2">
                        <SchoolOutlined className="float-end fs-1" style={{}} />
                        <span className="fw-bolder">Graduate Students </span>
                        <div>
                          Total Graduates <span className="badge bg-primary">12</span>
                        </div>
                      </div>
                      <div className="modal-footer border-top p-2 border-2">
                        <a className="mx-2">
                          <Visibility />
                        </a>
                        <a className="mx-3">
                          <PersonAddAlt />
                        </a>
                      </div>
                    </Card>
                  </section>
                </main>
              </Card>
              </section>
            </div>
          }
        </>

      </Navigation>
    </div>
  );
};
