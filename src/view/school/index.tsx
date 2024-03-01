/* eslint-disable @typescript-eslint/no-explicit-any */
import { Person, PersonAddAlt, Phone, RemoveRedEye, School, SchoolOutlined, Visibility, } from "@mui/icons-material";
import { Card, Divider } from "@mui/material";
import { SchoolMenu } from "../../MenuBarItems/SchoolMenu";
import { Navigation } from "../../components/default/Navigation";
import { PIE_CHART_DEFAULT } from "../../components/default/PIECHART";
import { useShowStudentFromSameSchoolStatusStatistics } from "../../controller/viewHooks/Student/ShowStudentFromSameSchoolStatusStatistics";
export const SchoolDashBoard = () => {
  const school=JSON.parse(String(localStorage.getItem("school")));
  const {isLoadingStudentStatusStatistics,studentsStatusStatistics}=useShowStudentFromSameSchoolStatusStatistics(Number(school.id));
const user=JSON.parse(String(localStorage.getItem("userData")));
  return (
    <div>
      <Navigation items={SchoolMenu}>
        <>
        <Card className="row m-auto" elevation={8}>
          <Card className="col-sm-3 d-flex align-content-center align-items-center justify-content-center">
              <img src={user.profilePicture} className="card-img" />
          </Card>
          <Card className="col-sm-3 d-flex align-content-center align-items-center justify-content-center">
              <div>
              <div className="mb-2"><Person/> {user.name}</div>
              <div className="mb-2"><Person/> {user.gender}</div>
              <div className="mb-2"><Phone/> {user.phoneNumber}</div>
              </div>
          </Card>
          <Card className="col-sm-3">
          <img src={school.logo} className="card-img" />
          </Card>
          <Card className="col-sm-3 d-flex align-content-center align-items-center justify-content-center">
              <div>
              <div className="mb-2"><School/> {school.name}</div>
              <div className="mb-2"><Person/> {school.location.Location.Location.name}/{school.location.Location.name}/{school.location.name}</div>
              <div className="mb-2">Total Faculty <a href="#" className="badge bg-primary">{school.facultyList.length}</a>
              </div>
              </div>
          </Card>
        </Card>
        <Divider/>      
        {!isLoadingStudentStatusStatistics&&studentsStatusStatistics.length!=0&&
        <div className="row col-12 m-auto  mt-2" >
          <Card className="col-sm-6 border border-3">
            <div className="fw-bold fs-2 mb-2">Student Status</div>
          <PIE_CHART_DEFAULT centerLabel="Student" items={studentsStatusStatistics}/>
          <a href="/school/student"><RemoveRedEye className="float-end"/></a>
          </Card>
          <Card className="col-sm-6 border-0 d-flex align-content-center align-items-center justify-content-center">
            <main className="col-sm-12">
            <section className="col-sm-12 mb-2">
              <Card className="border" elevation={3}>
                <div className="p-2">
                  <Person className="float-end fs-1" style={{}} />
                  <span className="fw-bolder">Total Student </span>
                  <div>
                    Total Student <span className="badge bg-primary">12</span>
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
        </div>
        }
        </>
       
      </Navigation>
    </div>
  );
};
