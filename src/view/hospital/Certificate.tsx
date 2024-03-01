import { Create } from "@mui/icons-material"
import { HospitalMenu } from "../../MenuBarItems/HospitalMenu"
import { DashboardCard } from "../../components/default/DashboardCard"
import { Navigation } from "../../components/default/Navigation"
import { Card } from "@mui/material"

export const Certificate=()=>{
    return(
        <Navigation items={HospitalMenu}>
                <div className="col-sm-4 float-end">
                <DashboardCard icon={<Create className="float-end "/>} size={12} title="Available Certificate" subtitleDescription="Total certificate" />
                </div>
                <div style={{clear:'both'}}></div>
                <div className="d-block text-center mt-5 fw-bold display-6" >List of available certificate</div>
                <div className="row col-sm-12 m-auto g-1" style={{clear:'both'}}>
                <Card className="col-sm-3" elevation={9}>
                    <img className="card-img-top" src="/visitor/bg-img.png" alt="Title" />
                    <div className="card-body">
                        <h4 className="card-title">Title</h4>
                        <p className="card-text">Text</p>
                    </div>
                </Card>
                
                </div>    
        </Navigation>
    )
}