
import { HdrStrongOutlined, ListAltOutlined, SchoolSharp } from "@mui/icons-material"
import { SchoolMenu } from "../../../MenuBarItems/SchoolMenu"
import { Navigation } from "../../../components/default/Navigation"
import { useState } from "react"
import { Faculty } from "./Faculty"
import { Department } from "./Department"
import { Courses } from "./Courses"
import { Semester } from "./Semester"

export const SchoolActivity=()=>{
    const [selected,setIsSelected]=useState(0);
    return(
        <Navigation items={SchoolMenu}>
            
        <div>
            <button onClick={()=>setIsSelected(0)} className={selected==0?"bg-primary text-light":"bg-white"}><ListAltOutlined/>Faculty</button>
            <button onClick={()=>setIsSelected(1)} className={selected==1?"bg-primary text-light":"bg-white"}><HdrStrongOutlined/>Department</button>
            <button onClick={()=>setIsSelected(2)} className={selected==2?"bg-primary text-light":"bg-white"}><SchoolSharp/>Courses</button>
            <button onClick={()=>setIsSelected(3)} className={selected==3?"bg-primary text-light":"bg-white"}><SchoolSharp/>Semester</button>
        </div>
       
        <div>
            {
                selected==0&&<Faculty/>
            }
            {
                selected==1&&<Department/>
            }
             {
                selected==2&&<Courses/>
            }
            {
                selected==3&&<Semester/>
            }
        </div>
      
        </Navigation>
    )
}