
import { HdrStrongOutlined, ListAltOutlined} from "@mui/icons-material"
import { SchoolMenu } from "../../../MenuBarItems/SchoolMenu"
import { Navigation } from "../../../components/default/Navigation"
import { useState } from "react"
import { Faculty } from "./Faculty"
import { Department } from "./Department"
import { Card } from "@mui/material"

export const SchoolActivity=()=>{
    const [selected,setIsSelected]=useState(0);
    return(
        <Navigation items={SchoolMenu}>
        <Card elevation={4} className="p-3 rounded-0">
            <div className="fw-bold mb-3">
                School Registrar Activities
            </div>
            <button onClick={()=>setIsSelected(0)} className={selected==0?"bg-primary text-light btn":"bg-white btn"}><ListAltOutlined/>Faculty</button>
            <button onClick={()=>setIsSelected(1)} className={selected==1?"bg-primary text-light btn":"bg-white btn"}><HdrStrongOutlined/>Department</button>
        </Card>
       
        <div>
            {
                selected==0&&<Faculty/>
            }
            {
                selected==1&&<Department/>
            }
        </div>
      
        </Navigation>
    )
}