import { AdminMenu } from "../../../MenuBarItems/AdminMenu"
import { SchoolComponent } from "../../../components/SchoolComponent"
import { Navigation } from "../../../components/default/Navigation"

export const SchoolManagement=()=>{
  return<Navigation items={AdminMenu}>
    <SchoolComponent accessedBy="admin"/>
  </Navigation>
}