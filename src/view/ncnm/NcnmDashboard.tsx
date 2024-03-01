import { PeopleAltOutlined } from "@mui/icons-material"
import { NcnmMenu } from "../../MenuBarItems/NcnmMenu"
import { DashboardCard } from "../../components/default/DashboardCard"
import { Navigation } from "../../components/default/Navigation"

export const NcnmDashboard=()=>{
    return(
        <Navigation  items={NcnmMenu}>
                <main className="row col-12">
                    <div className="col-sm-5">
                    <DashboardCard title="Available students" icon={<PeopleAltOutlined/>} subtitleDescription="Total available student" size={0}/>
                    </div>
                    <div className="col-sm-5">
                    <DashboardCard title="Available students" icon={<PeopleAltOutlined/>} subtitleDescription="Total available student" size={0}/>
                    </div>
                </main>
        </Navigation>
    )
}