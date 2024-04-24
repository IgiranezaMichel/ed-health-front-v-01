import { Button, } from "@mui/material"
import { useState } from "react"
import { AdminMenu } from "../../../MenuBarItems/AdminMenu"
import { Navigation } from "../../../components/default/Navigation"
import { Role } from "../../../enums/Role"
import UserList from "."

export const UserManagement=()=>{
const [selectedBtn,setSelectedBtn]=useState(0);
    return (
        <Navigation items={AdminMenu}>
        <div>
          <Button onClick={()=>setSelectedBtn(0)} className={selectedBtn==0?"bg-info text-white fw-bolder m-1":"bg-white border border-primary border-3 text-primary fw-bolder m-1"}>Student</Button>  
          <Button onClick={()=>setSelectedBtn(1)} className={selectedBtn==1?"bg-info text-white fw-bolder m-1":"bg-white border border-primary border-3 text-primary fw-bolder m-1"}> School Admin</Button>  
          <Button onClick={()=>setSelectedBtn(2)} className={selectedBtn==2?"bg-info text-white fw-bolder m-1":"bg-white border border-primary border-3 text-primary fw-bolder m-1"}>Hospital Admin</Button>  
          <Button onClick={()=>setSelectedBtn(3)} className={selectedBtn==3?"bg-info text-white fw-bolder m-1":"bg-white border border-primary border-3 text-primary fw-bolder m-1"}>ncnm admin</Button>  
        </div>
        {selectedBtn==0&&<UserList role={Role.STUDENT}/>}
        {selectedBtn==1&&<UserList role={Role.SCHOOL_ADMIN}/>}
        {selectedBtn==2&&<UserList role={Role.HOSPITAL_ADMIN}/>}
        {selectedBtn==3&&<UserList role={Role.NCNM_ADMIN}/>}
        </Navigation>
    )
}