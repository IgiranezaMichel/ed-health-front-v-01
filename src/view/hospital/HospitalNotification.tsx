import { Card } from "@mui/material"
import { Navigation } from "../../components/default/Navigation"
import { HospitalMenu } from "../../MenuBarItems/HospitalMenu"
import { ListAlt, NewReleases, Notifications } from "@mui/icons-material"

export const HospitalNotification=()=>{
    return(
       <Navigation items={HospitalMenu}>
        <h1>Notification <span className="float-end">
        <button className="btn btn-primary position-relative">
            <Notifications/>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-3 border-white">
                9<span className="visually-hidden">unread messages</span>
            </span>
        </button>
        </span> </h1>
        <button><ListAlt/> All notification</button><button><NewReleases/>New Notification</button>
         <Card>
            
        </Card>
       </Navigation>
    )
}