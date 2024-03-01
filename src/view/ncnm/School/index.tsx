import { NcnmMenu } from "../../../MenuBarItems/NcnmMenu"
import { SchoolComponent } from "../../../components/SchoolComponent"
import { Navigation } from "../../../components/default/Navigation"

export const NcnmSchool=()=>{
return(
    <Navigation items={NcnmMenu}>
        <SchoolComponent accessedBy="ncnm"/>
    </Navigation>
)
}