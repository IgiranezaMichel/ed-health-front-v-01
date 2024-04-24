import { NcnmMenu } from "../../../MenuBarItems/NcnmMenu"
import { Navigation } from "../../../components/default/Navigation"
import { SchoolComponent } from "../../admin/School/component/SchoolComponent"

export const NcnmSchool=()=>{
return(
    <Navigation items={NcnmMenu}>
        <SchoolComponent accessedBy="ncnm"/>
    </Navigation>
)
}