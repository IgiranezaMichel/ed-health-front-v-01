/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocationCitySharp, School } from "@mui/icons-material";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";
import { AdminMenu } from "../../../MenuBarItems/AdminMenu";
import { DashboardCard } from "../../../components/default/DashboardCard";
import { Navigation } from "../../../components/default/Navigation";
import { useSchoolDetailById } from "../../../controller/viewHooks/SchoolHooks";

export const SchoolDetail=()=>{
    const {id}=useParams();
    const {responseReady,schoolDetailObj}=useSchoolDetailById(Number(id));
    console.log(schoolDetailObj)
    return(
        <Navigation items={AdminMenu} >
               {responseReady&& <main>
                    <section className="row col-12 m-auto">
                    <Card className="col-sm-4"  elevation={3}>
                        <img className="card-img" src={schoolDetailObj.logo} alt="" />
                        <div><School/> {schoolDetailObj.name}</div>
                        <div><LocationCitySharp/> 
                        {schoolDetailObj.location.Location.Location.name}/
                        {schoolDetailObj.location.Location.name}/
                        {schoolDetailObj.location.name}
                         </div>
                    </Card >
                    <Card elevation={3} className="col-sm-8">
                        <h3>School Admins</h3>
                    </Card>
                    </section>
                    <main className="mb-3 col-12 m-auto row g-2">
                    {schoolDetailObj.facultyList.map((data:any)=>{
                        return(
                            
                                <div className="col-sm-4">
                                <DashboardCard title="Faculty" subtitleDescription={data.name}/>
                                </div>
                            
                        )
                    })}
                    </main>
                </main>}
        </Navigation>
    )
}