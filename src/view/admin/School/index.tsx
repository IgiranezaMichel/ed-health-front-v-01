import { AdminMenu } from "../../../MenuBarItems/AdminMenu"
import { Navigation } from "../../../components/default/Navigation"
import { SchoolComponent } from "./component/SchoolComponent"

export const SchoolManagement=()=>{
  return<Navigation items={AdminMenu}>
    <SchoolComponent accessedBy="admin"/>
  </Navigation>
}