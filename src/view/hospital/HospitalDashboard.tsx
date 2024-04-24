import { Card } from "@mui/material"
import { HospitalMenu } from "../../MenuBarItems/HospitalMenu"
import { Navigation } from "../../components/default/Navigation"
import {Person, PersonAddAlt, SchoolOutlined, Visibility} from "@mui/icons-material"
import { MuiCharts } from "../../muiCharts"

export const HospitalDashboard=()=>{
    return(
    <Navigation items={HospitalMenu}>
     <main className="row m-auto col-sm-10 mt-4 float-end">
            <section className="col-sm-6">
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
            <section className="col-sm-6">
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
                    <Visibility/>
                  </a>
                  <a className="mx-3">
                    <PersonAddAlt />
                  </a>
                </div>
              </Card>
             
            </section>
            
          </main>
          <MuiCharts/>
    </Navigation>)
}